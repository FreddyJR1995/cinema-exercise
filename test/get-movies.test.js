import { jest } from '@jest/globals'
import { get_movies } from "../javascript/get-movies.js"
import { mockMoviesResponse } from './mocks/moviesList.js';
import { API_URL, OPTIONS } from "../javascript/constants.js"


describe('movies service', () => {
  it('should return the list of movies using get_movies function', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve(JSON.stringify(mockMoviesResponse)),
      })
    );

    const movies = await get_movies();

    expect(global.fetch).toHaveBeenCalledWith(API_URL, OPTIONS);
    expect(movies).toEqual(mockMoviesResponse.results);
  });

  it('should handle errors when get_movies function throws an error', async () => {
    const errorMessage = 'Network error';
    global.fetch = jest.fn(() => Promise.reject(new Error(errorMessage)));

    const consoleErrorSpy = jest.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation(() => {});

    await get_movies();

    expect(global.fetch).toHaveBeenCalledWith(API_URL, OPTIONS);
    expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));

    consoleErrorSpy.mockRestore();
  });
})