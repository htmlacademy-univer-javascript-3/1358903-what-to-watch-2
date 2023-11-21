import { createSlice } from '@reduxjs/toolkit';
import { getAuthorizationStatus, login, logout } from '../api-actions';
import { ApiStatusPendingEnum, ApiStatusState, EReducers, initialApiState } from '../../types/api.ts';
import { IUser } from '../../types/user.ts';
import { dropToken, saveToken } from '../../services/token.ts';


export interface IAuthState {
  authorizationStatus: ApiStatusState<boolean>;
  user: ApiStatusState<IUser>;
}

const initialState: IAuthState = {
  authorizationStatus: initialApiState,
  user: initialApiState,
};

export const authSlice = createSlice({
  name: EReducers.Auth,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuthorizationStatus.pending, (state) => {
        state.authorizationStatus.apiStatus = ApiStatusPendingEnum.LOADING;
      })
      .addCase(getAuthorizationStatus.fulfilled, (state) => {
        state.authorizationStatus.apiStatus = ApiStatusPendingEnum.LOAD;
        state.authorizationStatus.apiData = true;
      })
      .addCase(getAuthorizationStatus.rejected, (state, action) => {
        state.authorizationStatus.apiStatus = ApiStatusPendingEnum.ERROR;
        state.authorizationStatus.apiError = action.error?.message || 'error';
      })


      .addCase(login.pending, (state) => {
        state.user.apiStatus = ApiStatusPendingEnum.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus.apiStatus = ApiStatusPendingEnum.LOAD;
        saveToken(action.payload.token);
        state.authorizationStatus.apiData = true;
        state.user.apiData = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.authorizationStatus.apiStatus = ApiStatusPendingEnum.ERROR;
        state.authorizationStatus.apiError = action.error?.message || 'error';
      })

      .addCase(logout.fulfilled, (state) => {
        dropToken();
        state.authorizationStatus = initialApiState;
        state.user = initialApiState;
      });

  },
});
