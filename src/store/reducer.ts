import { createReducer } from '@reduxjs/toolkit';
import { setGenre } from './action.ts';
import { ECatalog } from '../types/ECatalog.ts';

export interface ICatalogState {
  genre: ECatalog;
}

const initialState: ICatalogState = {
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

