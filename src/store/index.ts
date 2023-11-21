import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer.ts';
import { axiosInstance } from '../services/api.ts';


export const store = configureStore({
  reducer: {
    reducer
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
