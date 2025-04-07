import { createSlice, createSelector } from '@reduxjs/toolkit';
import { TStoreHouseProcess, State } from '../../types/state';
import { SubmitStatus } from '../../const';

import {
  fetchStoreHouse,
  fetchStoreHouseOperation,
  postStoreHouseOperation,
  postStoreHouse,
  editStoreHouse,
  deleteStoreHouse,
} from '../api-action';

const initialState: TStoreHouseProcess = {
  isLoading: false,
  positions: [],
  storehouseOperatons: [],
  totalItems: 0,
  isJobSendingStatus: SubmitStatus.Still,
};

export const storeHouseProcess = createSlice({
  name: 'STOREHOUSE',
  initialState,
  reducers: {
    resetJobSendingStatus: (state) => {
      state.isJobSendingStatus = SubmitStatus.Still;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchStoreHouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStoreHouse.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchStoreHouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.positions = action.payload
      })
      .addCase(postStoreHouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postStoreHouse.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(postStoreHouse.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editStoreHouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editStoreHouse.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editStoreHouse.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteStoreHouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStoreHouse.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteStoreHouse.fulfilled, (state) => {
        state.isLoading = false;
      })


      .addCase(fetchStoreHouseOperation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStoreHouseOperation.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchStoreHouseOperation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalItems = action.payload.totalItems,
        state.storehouseOperatons = action.payload.items
      })
      .addCase(postStoreHouseOperation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postStoreHouseOperation.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(postStoreHouseOperation.fulfilled, (state) => {
        state.isLoading = false;
      })
  }
});

export const { resetJobSendingStatus } = storeHouseProcess.actions;

export const selectSelf = (state: State) => state;
export const storehouse = createSelector(selectSelf, state => state.STOREHOUSE);

export const getIsJobSendingStatus = createSelector(storehouse, (state: TStoreHouseProcess): SubmitStatus => state.isJobSendingStatus);
export const getIsLoading = createSelector(storehouse, (state: TStoreHouseProcess) => state.isLoading);
export const getStoreHousePositions = createSelector(storehouse, (state: TStoreHouseProcess) => state.positions);
export const getAllPositionsLength = createSelector(storehouse, (state: TStoreHouseProcess) => state.positions.length);
export const getStoreHouseOperations = createSelector(storehouse, (state: TStoreHouseProcess) => state.storehouseOperatons);
export const getTotalCountOfStoreHouseOperations = createSelector(storehouse, (state: TStoreHouseProcess) => state.totalItems);
