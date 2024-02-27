import { FileType } from "@/typings";
import React, { useState } from "react";
import ReactPlayer from "react-player";

interface AudioPlayerProps {
  selectedSong: FileType | null; // Specify the prop type for selectedSong
}

function AudioPlayer({ selectedSong }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: any) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleProgress = (state: any) => {
    // Handle progress updates here if needed
    // console.log("Current time: ", state.playedSeconds);
  };
  return (
    <div>
      <ReactPlayer
        url={selectedSong?.song}
        playing={playing}
        volume={volume}
        onProgress={handleProgress}
        height="2%"
        width="2%"
      />
      <div className="flex items-center justify-center">
        <button onClick={handlePlayPause}>{playing ? "Pause" : "Play"}</button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}

export default AudioPlayer;
