import { createAction } from '@reduxjs/toolkit';
import { ECatalog } from '../types/ECatalog.ts';

export const setGenre = createAction<ECatalog>('setGenreType');
