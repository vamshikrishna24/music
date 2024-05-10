"use client";

import { FileType, SongData } from "@/typings";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import { useSocket } from "./socket-provider";

interface AudioPlayerProps {
  selectedSong: FileType | SongData | null;
}

function AudioPlayer({ selectedSong }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(true);
  const [loop, setLoop] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const playerRef = useRef<ReactPlayer>(null);
  const { socket, roomId } = useSocket();
  var videoUrl = "";

  if ((selectedSong! as SongData).videoId) {
    videoUrl = `https://www.youtube.com/watch?v=${
      (selectedSong! as SongData).videoId
    }`;
  }

  useEffect(() => {
    setPlaying(true);
  }, [selectedSong]);

  socket?.on("playPause", (data) => {
    setPlaying(data);
  });
  socket?.on("progress", (progress) => {
    setProgress(progress);
    if (playerRef.current) playerRef.current.seekTo(progress, "seconds");
  });
  socket?.on("loop", (loop) => {
    setLoop(loop);
  });

  const handlePlayPause = () => {
    setPlaying(!playing);
    socket?.emit("setPlayPause", !playing, roomId);
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
    socket?.emit("setProgress", newProgress, roomId);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };
  const handleRepeat = () => {
    setLoop(!loop);
    socket?.emit("loop", !loop, roomId);
  };

  function isFileType(song: FileType | SongData | null): song is FileType {
    return (song as FileType).song !== undefined;
  }

  return (
    <div className="bg-slate-200 dark:bg-slate-800">
      <ReactPlayer
        ref={playerRef}
        url={
          isFileType(selectedSong)
            ? selectedSong?.song
            : `${
                process.env.NEXT_PUBLIC_SOCKET_URL
              }/audio?url=${encodeURIComponent(videoUrl)}`
        }
        playing={playing}
        //volume={volume}
        onProgress={handleProgress}
        onDuration={handleDuration}
        loop={loop}
        hidden={true}
      />
      <div className="flex items-center justify-center mx-4  space-x-4">
        <div className="w-20 h-20">
          <img
            src={
              isFileType(selectedSong)
                ? selectedSong?.picture
                : (selectedSong as SongData).thumbnail
            }
            alt="image"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col flex-grow  items-center space-y-2 mr-4">
          <p className="text-md font-bold">{selectedSong?.title}</p>
          <div className="flex w-full gap-x-6">
            <div className="flex gap-x-3">
              <button onClick={handlePlayPause}>
                {playing ? <PauseIcon /> : <PlayArrowIcon />}
              </button>
              <button onClick={handleRepeat}>
                {loop ? (
                  <RepeatOneIcon />
                ) : (
                  <RepeatOneIcon className="text-muted-foreground" />
                )}
              </button>
            </div>

            <input
              className="w-full"
              type="range"
              min={0}
              max={duration}
              step={0.1}
              value={progress}
              onChange={handleProgressChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
