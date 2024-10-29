import { NextRequest } from "next/server";
import ytdl from "@distube/ytdl-core";
import { PassThrough } from "stream";

function streamToReadable(passThrough: PassThrough) {
  return new ReadableStream({
    start(controller) {
      passThrough.on("data", (chunk) => {
        controller.enqueue(chunk);
      });

      passThrough.on("end", () => {
        controller.close();
      });

      passThrough.on("error", (err) => {
        console.error("PassThrough stream error:", err);
        controller.error(err);
      });
    },
    cancel() {
      passThrough.destroy();
    },
  });
}

export async function GET(req: NextRequest) {
  try {
    const videoUrl = req.nextUrl.searchParams.get("url");
    if (!videoUrl) {
      return new Response("No video URL provided", { status: 400 });
    }

    const audioStream = ytdl(videoUrl, { filter: "audioonly" });
    const passThrough = new PassThrough();
    audioStream.pipe(passThrough);

    const readableStream = streamToReadable(passThrough);

    return new Response(readableStream, {
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch (err) {
    console.error("Streaming error:", err);
    return new Response("Error during streaming", { status: 500 });
  }
}
