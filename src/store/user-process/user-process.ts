import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchUserStatus, loginUser, logoutUser } from '../api-action';
import { AuthorizationStatus } from '../../const';
import type { State, TUserProcess } from '../../types/state';
// import { TUser } from '../../types/index';

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

export const selectSelf = (state: State) => state;
export const selectUser = createSelector(selectSelf, (state) => state.USER);

export const getAuthorizationStatus = createSelector(selectUser, (state) => state.authorizationStatus);
export const getUser = createSelector(selectUser, (state) => state.user);
export const getUserStatus = createSelector(getUser, (user) => user?.type);
export const getIsAuthorized = createSelector(selectUser, (state) => state.authorizationStatus === AuthorizationStatus.Auth);
