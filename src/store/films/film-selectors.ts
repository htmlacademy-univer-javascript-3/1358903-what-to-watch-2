import { RootState } from '../index.ts';


export const selectFilms = (state: RootState) => state.reducer.films;
export const selectFilmsData = (state: RootState) => selectFilms(state).films.apiData;
export const selectFilmsStatus = (state: RootState) => selectFilms(state).films.apiStatus;
export const selectFilmsError = (state: RootState) => selectFilms(state).films.apiError;

export const currentGenre = (state: RootState) => selectFilms(state).genre;

export const selectFilmData = (state: RootState) => selectFilms(state).film.apiData;
export const selectFilmStatus = (state: RootState) => selectFilms(state).film.apiStatus;
export const selectFilmError = (state: RootState) => selectFilms(state).film.apiError;

export const selectReviewsData = (state: RootState) => selectFilms(state).reviews.apiData;
export const selectReviewsStatus = (state: RootState) => selectFilms(state).reviews.apiStatus;
export const selectReviewsError = (state: RootState) => selectFilms(state).reviews.apiError;

export const selectSimilarData = (state: RootState) => selectFilms(state).similar.apiData;
export const selectSimilarStatus = (state: RootState) => selectFilms(state).similar.apiStatus;
export const selectSimilarError = (state: RootState) => selectFilms(state).similar.apiError;
