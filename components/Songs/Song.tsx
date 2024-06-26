import { FileType } from "@/typings";
import React from "react";

interface SongProps {
  file: FileType;
  onClick: () => void;
}

function Song({ file, onClick }: SongProps) {
  return (
    <div className="flex m-2  items-center justify-center">
      <div className="w-full sm:w-1/3 md:w-1/2">
        <div
          className="flex w-full dark:bg-slate-800 rounded-sm items-center bg-slate-200 cursor-pointer"
          onClick={onClick}
        >
          <div className="mr-3 w-1/5  md:w-1/4">
            <img src={file.picture} alt="image" className="object-cover" />
          </div>
          <div className="space-y-1 w-2/3  md:w-3/4">
            <p className="text-md font-semibold break-words"> {file.title}</p>
            <p className="text-sm"> {file.artist}</p>
            <p className="text-sm"> {file.year}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Song;
