"use client";
import { FileType } from "@/typings";
import React, { useEffect, useState } from "react";
import Song from "./Song";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAppState } from "@/store/store";
import { io } from "socket.io-client";

function SongsList() {
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [docs, loading, error] = useCollection(query(collection(db, "music")));

  const { setSong, socket, songFile } = useAppState();
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
    setSong(file);
    socket?.emit("song", file);
  };
  return (
    <div>
      <div className=" ">
        {initialFiles.map((file) => (
          <Song
            file={file}
            key={file.id}
            onClick={() => handleSongClick(file)}
          />
        ))}
      </div>
    </div>
  );
}

export default SongsList;
