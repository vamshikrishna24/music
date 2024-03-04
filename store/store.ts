import { FileType } from "@/typings";

import { create } from "zustand";

interface AppState {
  songFile: FileType | null;
  setSong: (song: FileType) => void;

  solo: boolean | null;
  setSolo: (solo: boolean) => void;

  group: boolean | null;
  setGroup: (solo: boolean) => void;
}

export const useAppState = create<AppState>((set) => ({
  songFile: null,
  setSong: (songFile: FileType | null) => set((state) => ({ songFile })),

  solo: null,
  setSolo: (solo: boolean | null) => set((State) => ({ solo })),

  group: null,
  setGroup: (group: boolean | null) => set((State) => ({ group })),
}));
