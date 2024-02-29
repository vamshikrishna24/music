import { FileType } from "@/typings";
import { create } from "zustand";

interface AppState {
  songFile: FileType | null;
  setSong: (song: FileType) => void;
}

export const useAppState = create<AppState>((set) => ({
  songFile: null,
  setSong: (songFile: FileType | null) => set((state) => ({ songFile })),
}));
