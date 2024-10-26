import { unstable_noStore as noStore } from "next/cache";
import { NextRequest } from "next/server";
import ytdl from "@distube/ytdl-core";

function iteratorToLiveStream(iterator: AsyncIterableIterator<any>) {
  return new ReadableStream({
    async pull(controller) {
      try {
        for await (const chunk of iterator) {
          controller.enqueue(chunk);
        }
        controller.close();
      } catch (err) {
        console.error("Stream error:", err);
        controller.error(err);
      }
    },
    cancel() {
      console.log("Stream canceled by the client.");
    },
  });
}

export function GET(req: NextRequest) {
  noStore();
  try {
    const videoUrl: string | null = req.nextUrl.searchParams.get("url");
    if (!videoUrl) {
      return new Response("Missing video URL", { status: 400 });
    }

    const audioStream = ytdl(videoUrl, {
      filter: "audioonly",
    });
    const stream = iteratorToLiveStream(audioStream[Symbol.asyncIterator]());

    return new Response(stream, {
      headers: {
        "content-type": "audio/mpeg",
        "transfer-encoding": "chunked", // Enable chunked transfer for live streaming
      },
    });
  } catch (err) {
    console.error("Error fetching video stream:", err);
    return new Response("Error fetching video stream", { status: 500 });
  }
}
