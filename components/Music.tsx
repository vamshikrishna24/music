import { collection, getDocs } from "firebase/firestore";
import Dropzone from "./Dropzone";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import SongsList from "./Songs/SongsList";
import Mediator from "./Songs/Mediator";

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
    <div>
      <Dropzone />
      <Mediator skeletonFiles={skeletonFiles} />
    </div>
  );
}

export default Music;
