import { OPTIONS, API_URL } from "./constants.js";

export const get_movie = async(id) => {
  try {
    const response = await fetch(`${API_URL}/titles/${id}?info=base_info`, OPTIONS);
    const result = await response.text();
    return JSON.parse(result);
  } catch (error) {
    console.error(error);
  }
}