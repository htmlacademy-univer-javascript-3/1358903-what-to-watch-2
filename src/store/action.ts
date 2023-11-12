import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ECatalog } from '../types/ECatalog.ts';
import { axiosInstance } from '../services/api.ts';
import { TFilm } from '../types/TFilm.ts';
import { AxiosResponse } from 'axios';

export const setGenre = createAction<ECatalog>('catalog/setGenreType');

export const fetchMovies = createAsyncThunk(
  'catalog/fetchMovies',
  async () => {
    const response: AxiosResponse<TFilm[]> = await axiosInstance.get('/films');
    return response.data;
  }
);


