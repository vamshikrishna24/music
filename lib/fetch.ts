"use Server";
import axios from "axios";

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
  if (data.error) {
    const result = [
      {
        author: "No Data",
        duration: 0,
        thumbnail:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEaYTaC-q-QWUu2g7QgVvRKkJkqXjXtjBU2w&s",
        title: "No Songs found, Search again...",
        videoId: "",
      },
    ];
    return result;
  }
  return data;
};
