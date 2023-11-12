import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { fetchMovies, setGenre } from './action.ts';
import { ECatalog } from '../types/ECatalog.ts';
import { TFilm } from '../types/TFilm.ts';
import { RootState } from './index.ts';
import { ApiStatusPendingEnum, ApiStatusState, initialApiState } from '../types/api.ts';


export interface ICatalogState {
  genre: ECatalog;
  films: ApiStatusState<TFilm[]>;
}

const initialState: ICatalogState = {
  genre: ECatalog.All,
  films: initialApiState
};

export const catalog = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(setGenre, (state, action) => {
        state.genre = action.payload;
      })

      .addCase(fetchMovies.pending, (state) => {
        state.films.apiStatus = ApiStatusPendingEnum.LOADING;
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<TFilm[]>) => {
        state.films.apiStatus = ApiStatusPendingEnum.LOAD;
        state.films.apiData = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.films.apiStatus = ApiStatusPendingEnum.ERROR;
        state.films.apiError = true;
      });
  }
);

export const selectCatalog = (state: RootState) => state.catalog;
export const selectFilmsData = (state: RootState) => selectCatalog(state).films.apiData;
export const selectFilmsStatus = (state: RootState) => selectCatalog(state).films.apiStatus;
export const selectFilmsError = (state: RootState) => selectCatalog(state).films.apiError;
