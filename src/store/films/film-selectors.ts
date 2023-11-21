import { RootState } from '../index.ts';


export const selectFilms = (state: RootState) => state.reducer.films;
export const selectFilmsData = (state: RootState) => selectFilms(state).films.apiData;
export const selectFilmsStatus = (state: RootState) => selectFilms(state).films.apiStatus;
export const selectFilmsError = (state: RootState) => selectFilms(state).films.apiError;

export const currentGenre = (state: RootState) => selectFilms(state).genre;
