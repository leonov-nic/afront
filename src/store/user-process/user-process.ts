import { createSlice } from '@reduxjs/toolkit';
import { fetchUserStatus, loginUser, logoutUser } from '../api-action';
import { AuthorizationStatus } from '../../const';
import type { State, TUserProcess } from '../../types/state';
import { TUser } from '../../types/index';

const initialState: TUserProcess = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  user: null,
};

export const userProcess = createSlice({
  name: 'USER',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      })
      .addCase(fetchUserStatus.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      })
  }
});

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state['USER'].authorizationStatus;
export const getIsAuthorized = (state: State): boolean => state['USER'].authorizationStatus === AuthorizationStatus.Auth;
export const getUser = (state: State): TUser | null => state['USER'].user;
