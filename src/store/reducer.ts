import { createReducer } from '@reduxjs/toolkit';
import { TFilm } from '../types/TFilm.ts';
import { films } from '../mocks/films.ts';
import { setGenre } from './action.ts';
import { ECatalog } from '../types/ECatalog.ts';

export interface ICatalogState {
  films: TFilm[];
  genre: ECatalog;
}

const initialState: ICatalogState = {
  films: films,
  genre: ECatalog.All,
};

export const catalog = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(setGenre, (state, action) => {
        state.genre = action.payload;
      });
  }
);

