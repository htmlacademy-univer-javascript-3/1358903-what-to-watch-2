import { configureStore } from '@reduxjs/toolkit';
import { catalog } from './reducer.ts';
import { axiosInstance } from '../services/api.ts';


export const store = configureStore({
  reducer: {
    catalog
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { axiosInstance }
      }
    })
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
