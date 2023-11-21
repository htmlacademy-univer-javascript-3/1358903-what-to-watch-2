import { createAction } from '@reduxjs/toolkit';
import { ECatalog } from '../types/catalog.ts';


export const setGenre = createAction<ECatalog>('reducer/setGenreType');

