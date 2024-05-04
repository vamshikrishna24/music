"use client";

import React, { useState } from "react";
import { fetchFromAPI } from "@/lib/fetch";
import { Input } from "@/components/ui/input";
import { SongData } from "@/typings";
import SongList from "@/components/onlineSongs/SongList";
import { useAppState } from "@/store/store";
import { useSocket } from "@/components/socket-provider";
import AudioPlayer from "@/components/AudioPlayer";

const OnlineMusic = () => {
  const { setSong, songFile } = useAppState();
  const { socket } = useSocket();
  const [songs, setSongs] = useState<SongData[]>([]);
  const [search, setSearch] = useState<string>("");

  socket?.on("selectedSong", (file) => {
    setSong(file);
  });

  const handleClick = () => {
    if (search === "") return;
    fetchFromAPI(`search?q=${search}`).then((data) => setSongs(data.result));
  };

  return (
    <div className=" pt-2">
      <div className="mx-4">
        <Input
          className="text-md"
          placeholder="Search Music"
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleClick();
          }}
        />{" "}
      </div>

      <div style={{ height: "calc(100vh - 200px)" }} className="mt-2">
        <SongList songs={songs} />
      </div>
      {songFile && <AudioPlayer selectedSong={songFile as SongData} />}
      {!songFile && (
        <div className="h-[87px] flex items-center justify-center bg-slate-200 dark:bg-slate-800 shadow-lg rounded-lg ">
          <p className="text-slate-500 font-semibold text-2xl dark:text-white md:font-bold md:text-3xl">
            {songs.length === 0 ? "Search for a Song" : "Select a song to play"}
          </p>
        </div>
      )}
    </div>
  );
};

export default OnlineMusic;
