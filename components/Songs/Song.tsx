import { FileType } from "@/typings";
import React from "react";

interface SongProps {
  file: FileType;
  onClick: () => void;
}

function Song({ file, onClick }: SongProps) {
  return (
    <div className="flex m-5   items-center justify-center">
      <div className="w-full sm:w-1/3 md:w-1/2">
        <div
          className="flex w-full dark:bg-slate-800 rounded-sm items-center bg-slate-200 cursor-pointer"
          onClick={onClick}
        >
          <div className="mr-3 w-1/3  md:w-1/4">
            <img src={file.picture} alt="image" className="object-cover" />
          </div>
          <div className="space-y-1 w-2/3  md:w-3/4">
            <p className="text-xl font-semibold">Title: {file.title}</p>
            <p className="text-sm">Artist: {file.artist}</p>
            <p className="text-sm">Year: {file.year}</p>
          </div>
        </div>
        {/* <div className="mt-1">
          <audio controls>
            <source src={file.song} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div> */}
      </div>
    </div>
  );
}

export default Song;
