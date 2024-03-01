import { FileType } from "@/typings";
import { Socket, io } from "socket.io-client";
import { create } from "zustand";

interface AppState {
  songFile: FileType | null;
  setSong: (song: FileType) => void;

  socket: Socket | null;
  connectSocket: () => void;
}

export const useAppState = create<AppState>((set) => ({
  songFile: null,
  setSong: (songFile: FileType | null) => set((state) => ({ songFile })),

  socket: null,
  connectSocket: () => {
    const socket = io("https://music-nine-sand.vercel.app:3001");

    set({ socket });
  },
}));
