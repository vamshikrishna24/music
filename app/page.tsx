"use client";
import AudioPlayer from "@/components/AudioPlayer";
import Music from "@/components/Music";

export default function Home() {
  return (
    <div
      className="overflow-hidden h-screen"
      style={{ height: "calc(100vh - 58px)" }}
    >
      <Music />
    </div>
  );
}
