import { FileType } from "@/typings";
import React, { useState } from "react";
import Song from "./Song";
import AudioPlayer from "../AudioPlayer";

function SongsList({ skeletonFiles }: { skeletonFiles: FileType[] }) {
  const [selectedSong, setSelectedSong] = useState<FileType | null>(null);
  const handleSongClick = (file: FileType) => {
    setSelectedSong(file);
  };
  return (
    <div>
      <p className="text-center font-medium text-xl m-5 w-fit">All Songs</p>
      <div className=" ">
        {skeletonFiles.map((file) => (
          <Song
            file={file}
            key={file.id}
            onClick={() => handleSongClick(file)}
          />
        ))}
      </div>
      {selectedSong && <AudioPlayer selectedSong={selectedSong} />}
    </div>
  );
}

export default SongsList;
