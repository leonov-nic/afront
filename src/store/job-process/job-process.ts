import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { TJobProcess, State } from '../../types/state';
import { TJobRDO, TEmployee, TDetail } from '../../types';
import { SubmitStatus } from '../../const';

import {
  fetchJobs,
  deleteJob,
  fetchEmployees,
  deleteEmployee,
  postEmployee,
  fetchDetails
} from '../api-action';

const initialState: TJobProcess = {
  isLoading: false,
  jobs: [],
  employees: [],
  details: [],
  isJobSendingStatus: SubmitStatus.Still,
  sortDate: '',
};

export const jobProcess = createSlice({
  name: 'JOB',
  initialState,
  reducers: {
    setSortDate: (state, action: PayloadAction<string>) => {
      state.sortDate = action.payload;
    },
    resetJobSendingStatus: (state) => {
      state.isJobSendingStatus = SubmitStatus.Still;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.jobs = [];
        state.isLoading = true;
      })
      .addCase(fetchJobs.rejected, (state) => {
        state.jobs = [];
        state.isLoading = false;
        state.isJobSendingStatus = SubmitStatus.Pending;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.isLoading = false;
        state.isJobSendingStatus = SubmitStatus.Fullfilled;
        state.isJobSendingStatus = SubmitStatus.Still;
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchEmployees.pending, (state) => {
        state.employees = [];
        state.isLoading = true;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.employees = [];
        state.isLoading = false;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteEmployee.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(postEmployee.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchDetails.pending, (state) => {
        state.details = [];
        state.isLoading = true;
      })
      .addCase(fetchDetails.rejected, (state) => {
        state.details = [];
        state.isLoading = false;
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.details = action.payload;
        state.isLoading = false;
      })
  }
});

export const { resetJobSendingStatus, setSortDate } = jobProcess.actions;

export const getIsLoading = (state: State): boolean => state['JOB'].isLoading;
export const getJobs = (state: State): TJobRDO[] => state['JOB'].jobs;
export const getEmployees = (state: State): TEmployee[] => state['JOB'].employees;
export const getDetails = (state: State): TDetail[] => state['JOB'].details;
export const getSortDate = (state: State): string => state['JOB'].sortDate;
export const getIsJobSendingStatus = (state: State): SubmitStatus => state['JOB'].isJobSendingStatus;

export const selectSortDateJobs = createSelector(
  [getJobs, getSortDate],
  (jobs, sortDate,) => jobs.filter((job) => job.createdAt === sortDate)
);
