import { configureStore } from '@reduxjs/toolkit';
import { catalog } from './reducer.ts';


export const store = configureStore({
  reducer: {
    catalog
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
