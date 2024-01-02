import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Film } from '../../types/film.ts';
import { ECatalog } from '../../types/catalog.ts';
import { ApiStatusPendingEnum, ApiStatusState, EReducers, initialApiState } from '../../types/api.ts';
import { fetchFavoriteFilms, fetchFilm, fetchMovies, fetchPromo, fetchReviews, fetchSimilar } from '../api-actions.ts';
import { setGenre } from '../action.ts';
import { IReview } from '../../types/review.ts';

export interface IFilmsState {
  genre: ECatalog;
  films: ApiStatusState<Film[]>;
  film: ApiStatusState<Film>;
  reviews: ApiStatusState<IReview[]>;
  similar: ApiStatusState<Film[]>;
  favoriteFilms: ApiStatusState<Film[]>;
}

export const initialState: IFilmsState = {
  genre: ECatalog.All,
  films: initialApiState,
  favoriteFilms: initialApiState,
  film: initialApiState,
  reviews: initialApiState,
  similar: initialApiState,
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
      .addCase(fetchMovies.rejected, (state) => {
        state.films.apiStatus = ApiStatusPendingEnum.ERROR;
        state.films.apiError = true;
      })


      .addCase(fetchFilm.pending, (state) => {
        state.film.apiStatus = ApiStatusPendingEnum.LOADING;
      })
      .addCase(fetchFilm.fulfilled, (state, action: PayloadAction<Film>) => {
        state.film.apiStatus = ApiStatusPendingEnum.LOAD;
        state.film.apiData = action.payload;
      })
      .addCase(fetchFilm.rejected, (state) => {
        state.film.apiStatus = ApiStatusPendingEnum.ERROR;
        state.film.apiError = true;
      })

      .addCase(fetchFavoriteFilms.pending, (state) => {
        state.favoriteFilms.apiStatus = ApiStatusPendingEnum.LOADING;
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action: PayloadAction<Film[]>) => {
        state.favoriteFilms.apiStatus = ApiStatusPendingEnum.LOAD;
        state.favoriteFilms.apiData = action.payload;
      })
      .addCase(fetchFavoriteFilms.rejected, (state) => {
        state.favoriteFilms.apiStatus = ApiStatusPendingEnum.ERROR;
        state.favoriteFilms.apiError = true;
      })


      .addCase(fetchPromo.pending, (state) => {
        state.film.apiStatus = ApiStatusPendingEnum.LOADING;
      })
      .addCase(fetchPromo.fulfilled, (state, action: PayloadAction<Film>) => {
        state.film.apiStatus = ApiStatusPendingEnum.LOAD;
        state.film.apiData = action.payload;
      })
      .addCase(fetchPromo.rejected, (state) => {
        state.film.apiStatus = ApiStatusPendingEnum.ERROR;
        state.favoriteFilms.apiError = true;
      })

      .addCase(fetchReviews.pending, (state) => {
        state.reviews.apiStatus = ApiStatusPendingEnum.LOADING;
      })
      .addCase(fetchReviews.fulfilled, (state, action: PayloadAction<IReview[]>) => {
        state.reviews.apiStatus = ApiStatusPendingEnum.LOAD;
        state.reviews.apiData = action.payload;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.reviews.apiStatus = ApiStatusPendingEnum.ERROR;
        state.favoriteFilms.apiError = true;
      })


      .addCase(fetchSimilar.pending, (state) => {
        state.similar.apiStatus = ApiStatusPendingEnum.LOADING;
      })
      .addCase(fetchSimilar.fulfilled, (state, action: PayloadAction<Film[]>) => {
        state.similar.apiStatus = ApiStatusPendingEnum.LOAD;
        state.similar.apiData = action.payload;
      })
      .addCase(fetchSimilar.rejected, (state) => {
        state.similar.apiStatus = ApiStatusPendingEnum.ERROR;
        state.favoriteFilms.apiError = true;
      });
  },
});
