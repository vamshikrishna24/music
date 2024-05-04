import React from "react";
import { SongData } from "@/typings";
import { useAppState } from "@/store/store";
import { useSocket } from "../socket-provider";

const SongList = ({ songs }: { songs: SongData[] }) => {
  const { setSong, songFile } = useAppState();
  const { socket, roomId } = useSocket();
  const truncateText = (text: any) => {
    return text.length > 30 ? `${text.substring(0, 30)}...` : text;
  };
  const hangleSongClick = (song: SongData) => {
    setSong(song);
    socket?.emit("selectingSong", song, roomId);
  };
  return (
    <div className="h-full overflow-y-scroll overflow-x-hidden">
      {songs.map((song, index) => (
        <div
          key={index}
          className="flex m-2  items-center justify-center "
          onClick={() => hangleSongClick(song)}
        >
          <div className="w-full sm:w-1/3 md:w-1/2 ">
            <div className="flex w-full dark:bg-slate-800 rounded-sm items-center bg-slate-200 cursor-pointer hover:bg-slate-400 dark:hover:bg-slate-700">
              <div className="mr-3 ">
                <img
                  src={song.thumbnail}
                  alt="image"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1 w-2/3  md:w-3/4">
                <p className="text-md font-semibold break-words">
                  {" "}
                  {song.title}
                </p>
                <p className="text-sm"> {truncateText(song.author)}</p>
                <p className="text-sm"> {song.duration}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;
