import { jest } from "@jest/globals"
import { get_movie } from "../javascript/get-movie"
import { mockMovieResponse } from "./mocks/movie";
import { OPTIONS, API_URL, API_MOVIE_ID_URL } from "../javascript/constants.js";

describe("get_movie function", () => {
  it("should return movie info using get_movie function", async () => {
    const mockId = "tt12345";
    const expectedURL = API_MOVIE_ID_URL(mockId)
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve(JSON.stringify(mockMovieResponse)),
      })
    );

    const movie = await get_movie(mockId);

    expect(global.fetch).toHaveBeenCalledWith(expectedURL, OPTIONS);
    expect(movie).toEqual(mockMovieResponse);
  });

  it("should handle errors when get_movie function throws an error", async () => {
    const mockId = "tt12345";
    const expectedURL = API_MOVIE_ID_URL(mockId)
    const errorMessage = "Network error";
    global.fetch = jest.fn(() => Promise.reject(new Error(errorMessage)));

    const consoleErrorSpy = jest.spyOn(console, "error");
    consoleErrorSpy.mockImplementation(() => {}); 

    await get_movie(mockId);

    expect(global.fetch).toHaveBeenCalledWith(expectedURL, OPTIONS);
    expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));

    consoleErrorSpy.mockRestore();
  });
});
