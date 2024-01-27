import { FileType } from "@/typings";
import React from "react";
import Song from "./Song";

function SongsList({ skeletonFiles }: { skeletonFiles: FileType[] }) {
  return (
    <div>
      <p className="text-center font-medium text-xl m-5 w-fit">All Songs</p>
      <div className=" ">
        {skeletonFiles.map((file) => (
          <Song file={file} key={file.id} />
        ))}
      </div>
    </div>
  );
}

export default SongsList;
