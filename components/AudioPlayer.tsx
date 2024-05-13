"use client";

import { FileType, SongData } from "@/typings";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import { useSocket } from "./socket-provider";
import Loading from "@/components/Loading";

interface AudioPlayerProps {
  selectedSong: FileType | SongData | null;
}

function AudioPlayer({ selectedSong }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(true);
  const [loop, setLoop] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const playerRef = useRef<ReactPlayer>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { socket, roomId } = useSocket();
  var videoUrl = "";

  if ((selectedSong! as SongData).videoId) {
    videoUrl = `https://www.youtube.com/watch?v=${
      (selectedSong! as SongData).videoId
    }`;
  }

  useEffect(() => {
    setLoading(true);
    audioRef.current?.pause();
    fetch(`/api/audio?url=${encodeURIComponent(videoUrl)}`)
      .then((res) => res.body)
      .then((body) => {
        const reader = body?.getReader();
        return new ReadableStream<Uint8Array>({
          start(controller) {
            return pump();
            function pump(): Promise<any> {
              //@ts-ignore
              return reader.read().then(({ done, value }) => {
                // When no more data needs to be consumed, close the stream
                if (done) {
                  controller.close();
                  return;
                }
                // Enqueue the next data chunk into our target stream
                controller.enqueue(value);
                return pump();
              });
            }
          },
        });
      })
      .then((stream) => new Response(stream))
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => {
        setLoading(false);

        if (audioRef.current) {
          audioRef.current.src = url;
          if (playing) audioRef.current.play();
          else {
            audioRef.current.pause();
          }
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [(selectedSong as SongData).videoId]);

  useEffect(() => {
    setPlaying(true);
  }, [selectedSong]);

  socket?.on("playPause", (data) => {
    setPlaying(data);
    if (data) {
      audioRef.current?.play();
    } else audioRef.current?.pause();
  });
  socket?.on("progress", (progress) => {
    setProgress(progress);
    if (playerRef.current) playerRef.current.seekTo(progress, "seconds");
    if (audioRef.current) audioRef.current.currentTime = progress;
  });
  socket?.on("loop", (loop) => {
    setLoop(loop);
  });

  const handlePlayPause = () => {
    setPlaying(!playing);
    if (playing) {
      audioRef.current?.pause();
    } else audioRef.current?.play();
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

  const handleProgressSongChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    if (audioRef.current) {
      const newTime = (newProgress / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      socket?.emit("setProgress", newTime, roomId);
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };
  const handleRepeat = () => {
    setLoop(!loop);
    socket?.emit("loop", !loop, roomId);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      var progress =
        (audioRef.current?.currentTime / audioRef.current?.duration) * 100;
      setProgress(progress);
    }
  };

  function isFileType(song: FileType | SongData | null): song is FileType {
    return (song as FileType).song !== undefined;
  }

  return (
    <div className="bg-slate-200 dark:bg-slate-800">
      <ReactPlayer
        ref={playerRef}
        url={(selectedSong as FileType).song}
        playing={playing}
        onProgress={handleProgress}
        onDuration={handleDuration}
        loop={loop}
        hidden={true}
      />
      <audio
        ref={audioRef}
        id="wavSource"
        onTimeUpdate={handleTimeUpdate}
        loop={loop}
      ></audio>
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

            {(selectedSong as SongData).videoId ? (
              loading ? (
                <Loading />
              ) : (
                <input
                  className="w-full"
                  type="range"
                  min={0}
                  value={progress}
                  onChange={handleProgressSongChange}
                />
              )
            ) : (
              <input
                className="w-full"
                type="range"
                min={0}
                max={duration}
                step={0.1}
                value={progress}
                onChange={handleProgressChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
