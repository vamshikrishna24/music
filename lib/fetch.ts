"use Server";
import axios from "axios";
import ytdl from "discord-ytdl-core";

const BASE_URL = process.env.NEXT_PUBLIC_MUSIC_BASE_URL;
const options = {
  url: BASE_URL,
  params: {
    type: "song",
  },
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-music-api3.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url: any) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};
