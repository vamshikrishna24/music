"use client";

import { FileType } from "@/typings";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

interface AudioPlayerProps {
  selectedSong: FileType | null;
}

function AudioPlayer({ selectedSong }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const playerRef = useRef<ReactPlayer>(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: any) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleProgress = (state: any) => {
    setProgress(state.playedSeconds);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    if (playerRef.current) {
      playerRef.current.seekTo(newProgress, "seconds");
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  return (
    <div className="bg-slate-200 dark:bg-slate-800">
      <ReactPlayer
        ref={playerRef}
        url={selectedSong?.song}
        playing={playing}
        //volume={volume}
        onProgress={handleProgress}
        height="0%"
        width="0%"
        onDuration={handleDuration}
      />
      <div className="flex items-center justify-center mx-4  space-x-4">
        <div className="w-20 h-20">
          <img
            src={selectedSong?.picture}
            alt="image"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col flex-grow  items-center space-y-2 mr-4">
          <input
            className="w-full"
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={progress}
            onChange={handleProgressChange}
          />
          <button onClick={handlePlayPause}>
            {playing ? <PauseIcon /> : <PlayArrowIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
