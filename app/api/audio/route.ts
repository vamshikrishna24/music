import { unstable_noStore as noStore } from "next/cache";
import { NextRequest } from "next/server";
import ytdl from "@distube/ytdl-core";

function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

export function GET(req: NextRequest) {
  noStore();
  try {
    const videoUrl: any = req.nextUrl.searchParams.get("url");
    const audioStream = ytdl(videoUrl, { filter: "audioonly" });
    const stream = iteratorToStream(audioStream.iterator());

    return new Response(stream, {
      headers: { "content-type": "audio/mpeg" },
    });
  } catch (err) {
    console.error(err);
    return new Response("error");
  }
}
