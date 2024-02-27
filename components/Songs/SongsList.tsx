"use client";
import { FileType } from "@/typings";
import React, { useEffect, useState } from "react";
import Song from "./Song";
import AudioPlayer from "../AudioPlayer";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useCollection } from "react-firebase-hooks/firestore";

function SongsList() {
  const [selectedSong, setSelectedSong] = useState<FileType | null>(null);
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [docs, loading, error] = useCollection(query(collection(db, "music")));
  useEffect(() => {
    if (!docs) return;
    const files: FileType[] = docs.docs.map((doc) => ({
      id: doc.id,
      artist: doc.data().artist,
      picture: doc.data().picture,
      title: doc.data().title,
      year: doc.data().year,
      song: doc.data().songUrl,
    }));
    setInitialFiles(files);
  }, [docs]);
  const handleSongClick = (file: FileType) => {
    setSelectedSong(file);
  };
  return (
    <div>
      <p className="text-center font-medium text-xl m-5 w-fit">All Songs</p>
      <div className=" ">
        {initialFiles.map((file) => (
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
