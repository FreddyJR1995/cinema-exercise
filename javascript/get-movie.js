import { OPTIONS, API_MOVIE_ID_URL } from "./constants.js";

export const get_movie = async (id) => {
  try {
    const url = API_MOVIE_ID_URL(id);
    const response = await fetch(url, OPTIONS);
    const result = await response.text();
    return JSON.parse(result);
  } catch (error) {
    console.error(error);
  }
}