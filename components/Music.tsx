"use client";

import SongsList from "./Songs/SongsList";

function Music() {
  return (
    <div className="h-full overflow-y-scroll">
      <p className="text-left font-medium text-xl m-5 w-full">All Songs</p>
      <SongsList />
    </div>
  );
}

export default Music;
