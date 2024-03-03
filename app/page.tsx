import AudioPlayer from "@/components/AudioPlayer";
import Music from "@/components/Music";
import { useAppState } from "@/store/store";

export default function Home() {
  const { songFile } = useAppState();

  return (
    <div className="h-full overflow-hidden">
      <div style={{ height: "calc(100vh - 145px)" }}>
        <Music />
      </div>
      {songFile && <AudioPlayer selectedSong={songFile} />}
      {!songFile && (
        <div className="h-[87px] flex items-center justify-center bg-slate-200 dark:bg-slate-800 shadow-lg rounded-lg ">
          <p className="text-slate-500 font-semibold text-2xl dark:text-white md:font-bold md:text-3xl">
            Select a song to play
          </p>
        </div>
      )}
    </div>
  );
}
