import { FileType, SongData } from "@/typings";

import { create } from "zustand";

interface AppState {
  songFile: FileType | SongData | null;
  setSong: (song: FileType | SongData | null) => void;

  solo: boolean | null;
  setSolo: (solo: boolean) => void;

  group: boolean | null;
  setGroup: (solo: boolean) => void;

  navigation: string | null;
  setNavigation: (navigation: string) => void;
}

export const useAppState = create<AppState>((set) => ({
  songFile: null,
  setSong: (songFile: FileType | SongData | null) =>
    set((state) => ({ songFile })),

  solo: null,
  setSolo: (solo: boolean | null) => set((State) => ({ solo })),

  group: null,
  setGroup: (group: boolean | null) => set((State) => ({ group })),

  navigation: null,
  setNavigation: (navigation: string | null) =>
    set((State) => ({ navigation })),
}));
