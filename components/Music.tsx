import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import SongsList from "./Songs/SongsList";

async function Music() {
  const docResults = await getDocs(collection(db, "music"));

  const skeletonFiles: FileType[] = docResults.docs.map((doc) => ({
    id: doc.id,
    artist: doc.data().artist,
    picture: doc.data().picture,
    title: doc.data().title,
    year: doc.data().year,
    song: doc.data().songUrl,
  }));

  return (
    <div className="h-full overflow-y-scroll">
      {/* <Dropzone /> */}
      <p className="text-left font-medium text-xl m-5 w-full">All Songs</p>
      <SongsList />
    </div>
  );
}

export default Music;
