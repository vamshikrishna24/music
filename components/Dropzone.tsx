"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import * as mm from "music-metadata-browser";
import DropzoneComponent from "react-dropzone";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Dropzone() {
  const [uploading, setUploading] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [filesUploaded, setFilesUploaded] = useState<number>(0);
  const [redirect, setRedirect] = useState<boolean>(false);
  const maxSize = 20971520;
  const mp3MimeType = "audio/mpeg";
  const router = useRouter();

  useEffect(() => {
    if (redirect) {
      router.push("/");
    }
  }, [redirect, router]);

  const onDrop = (acceptedFiles: File[]) => {
    setUploading(true);
    setFilesToUpload(acceptedFiles);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        await uploadMusic(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadMusic = async (selectedFile: File) => {
    const toastId = toast.loading("Uploading File...");
    if (selectedFile.type !== mp3MimeType) {
      console.log("Invalid file type. Please select an MP3 file.");
      toast.error("Error in Uploading File", {
        id: toastId,
      });
      return;
    }
    const metadata = await mm.parseBlob(selectedFile);
    const pictureData = metadata.common.picture?.[0];
    const pictureUrl = pictureData
      ? `data:${pictureData.format};base64,${pictureData.data.toString(
          "base64"
        )}`
      : "";

    const imageStorageRef = ref(storage, `images/${metadata.common.title}.jpg`);
    await uploadString(imageStorageRef, pictureUrl, "data_url");

    const downloadURL = await getDownloadURL(imageStorageRef);

    const docRef = await addDoc(collection(db, "music"), {
      artist: metadata.common.artist,
      title: metadata.common.title,
      year: metadata.common.year,
      picture: downloadURL,
    });

    const fileStorageRef = ref(storage, `songs/${metadata.common.title}`);

    uploadBytes(fileStorageRef, selectedFile).then(async (snapshot) => {
      const downloadUrl = await getDownloadURL(fileStorageRef);
      await updateDoc(doc(db, "music", docRef.id), {
        songUrl: downloadUrl,
      });
    });

    toast.success("File Upload Successfull", {
      id: toastId,
    });
    setFilesUploaded((prev) => prev + 1);
    if (filesUploaded === filesToUpload.length) {
      setRedirect(true);
      setUploading(false);
    }
  };

  return (
    <div className="m-3">
      <DropzoneComponent onDrop={onDrop} disabled={uploading}>
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragReject,
          fileRejections,
        }) => {
          const isFileTooLarge =
            fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
          return (
            <section>
              <div
                {...getRootProps()}
                className={cn(
                  "w-full h-52 flex items-center justify-center p-5  border border-dashed rounded-lg text-center",
                  isDragActive
                    ? "bg-[#035FFE] text-white animate-pulse"
                    : " bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
                )}
              >
                <input {...getInputProps()} />
                {!isDragActive && "Click here or drop files to upload!"}
                {isDragActive && !isDragReject && "Drop to upload this file!"}
                {isDragReject && "File type not accepted, sorry!"}
                {isFileTooLarge && (
                  <div className="text-danger mt-2">File is too large</div>
                )}
              </div>
            </section>
          );
        }}
      </DropzoneComponent>
    </div>
  );
}

export default Dropzone;
