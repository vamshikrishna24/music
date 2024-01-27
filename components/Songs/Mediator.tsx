"use client";
import { FileType } from "@/typings";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import SongsList from "./SongsList";

function Mediator({ skeletonFiles }: { skeletonFiles: FileType[] }) {
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
  return (
    <div>
      <SongsList skeletonFiles={initialFiles} />
    </div>
  );
}

export default Mediator;
