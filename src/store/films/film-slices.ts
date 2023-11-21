import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Film } from '../../types/film.ts';
import { ECatalog } from '../../types/catalog.ts';
import { ApiStatusPendingEnum, ApiStatusState, EReducers, initialApiState } from '../../types/api.ts';
import { fetchMovies } from '../api-actions.ts';
import { setGenre } from '../action.ts';

export interface IFilmsState {
  genre: ECatalog;
  films: ApiStatusState<Film[]>;
}

const initialState: IFilmsState = {
  genre: ECatalog.All,
  films: initialApiState,
};

export const filmSlice = createSlice({
  name: EReducers.Films,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setGenre, (state, action) => {
        state.genre = action.payload;
      })

      .addCase(fetchMovies.pending, (state) => {
        state.films.apiStatus = ApiStatusPendingEnum.LOADING;
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Film[]>) => {
        state.films.apiStatus = ApiStatusPendingEnum.LOAD;
        state.films.apiData = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.films.apiStatus = ApiStatusPendingEnum.ERROR;
        state.films.apiError = action.error.message || 'error';
      });
  },
});
