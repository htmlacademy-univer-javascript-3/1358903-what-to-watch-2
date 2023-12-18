import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './index.ts';
import axios, { AxiosResponse } from 'axios';
import { IUser } from '../types/user.ts';
import { Film } from '../types/film.ts';
import { axiosInstance } from '../services/api.ts';
import { IAuth } from '../types/api.ts';
import { IReview } from '../types/review.ts';


export const getAuthorizationStatus = createAsyncThunk(
  'user/getAuthorizationStatus',
  async () => {
    try {
      await axiosInstance.get('/login');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw e;
      } else {
        throw new Error('error');
      }
    }
  },
);

export const login = createAsyncThunk<IUser, IAuth, {
  state: RootState;
}>(
  'user/login',
  async ({ email, password }) => {
    try {
      const response = await axiosInstance.post<IUser>('/login', { email, password });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          throw new Error('error 401');
        }
        throw e;
      } else {
        throw new Error('error');
      }
    }
  },
);

export const logout = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await axiosInstance.delete('/logout');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw e;
      } else {
        throw new Error('error');
      }
    }
  },
);


export const fetchMovies = createAsyncThunk(
  'reducer/fetchMovies',
  async () => {
    try {
      const response: AxiosResponse<Film[]> = await axiosInstance.get('/films');
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw e;
      } else {
        throw new Error('error');
      }
    }
  }
);


export const fetchFilm = createAsyncThunk(
  'films/fetchFilm',
  async (filmId: string) => {
    try {
      const { data } = await axiosInstance.get<Film>(`/films/${filmId}`);
      return data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw e;
      } else {
        throw new Error('error');
      }
    }
  }
);

export const fetchFavoriteFilms = createAsyncThunk(
  'films/fetchFavoriteFilms',
  async () => {
    try {
      const { data } = await axiosInstance.get<Film[]>('/favorite');
      return data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw e;
      } else {
        throw new Error('error');
      }
    }
  }
);

export const fetchPromo = createAsyncThunk(
  'films/fetchPromo',
  async () => {
    try {
      const { data } = await axiosInstance.get<Film>('/promo');
      return data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw e;
      } else {
        throw new Error('error');
      }
    }
  }
);

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (filmId: string) => {
    try {
      const { data } = await axiosInstance.get<IReview[]>(`/comments/${filmId}`);
      return data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw e;
      } else {
        throw new Error('error');
      }
    }
  }
);

export const fetchSimilar = createAsyncThunk(
  'films/fetchSimilar',
  async (filmId: string) => {
    try {
      const { data } = await axiosInstance.get<Film[]>(`/films/${filmId}/similar`);
      return data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw e;
      } else {
        throw new Error('error');
      }
    }
  }
);

export const setFavorite = createAsyncThunk<Film, { status: boolean; filmId: string }, {dispatch: AppDispatch}>(
  'films/setFavorite',
  async ({ status, filmId }, {dispatch}) => {
    try {
      const { data } = await axiosInstance.post<Film>(
        `/favorite/${filmId}/${status ? 0 : 1}`
      );
      dispatch(fetchFilm(filmId));
      dispatch(fetchFavoriteFilms());
      return data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw e;
      } else {
        throw new Error('error');
      }
    }
  }
);

export const addReview = createAsyncThunk<
  void,
  { comment: string; rating: number; filmId: string }>(
    'reviews/addReview',
    async ({ comment, rating, filmId }) => {
      try {
        await axiosInstance.post(`/comments/${filmId}`, { comment, rating });
      } catch (e) {
        if (axios.isAxiosError(e)) {
          throw e;
        } else {
          throw new Error('error');
        }
      }
    }
  );
