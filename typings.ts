export type FileType = {
  id: string;
  artist: string;
  title: string;
  year: number;
  picture: string;
  song: string;
};

export type UserData = {
  username: string | null;
  roomId: number | null;
  solo: boolean;
  group: boolean;
  navigation: string | null;
};

export type MessageData = {
  Id: string | null;
  username: string | null;
  userId: string | null;
  message: string | null;
};

export type SongData = {
  author: string | null;
  duration: number;
  thumbnail: string | undefined;
  title: string | null;
  videoId: string;
};
