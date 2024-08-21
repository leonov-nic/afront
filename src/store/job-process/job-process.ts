import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { TJobProcess, State } from '../../types/state';
import { SubmitStatus } from '../../const';

import {
  fetchJobs,
  deleteJob,
  fetchEmployees,
  deleteEmployee,
  postEmployee,
  fetchDetails,
  postJob
} from '../api-action';

const initialState: TJobProcess = {
  isLoading: false,
  jobs: [],
  newJobs: [],
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
        state.isLoading = true;
      })
      .addCase(fetchJobs.rejected, (state) => {
        state.isLoading = false;
      })
      // .addCase(fetchJobs.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.jobs = action.payload;
      //   // state.jobs = [];
      
      //   // state.jobs = state.jobs.concat(action.payload);
      //   // state.jobs = [...state.jobs, ...action.payload];
      // })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        const existingIds = new Set(state.newJobs.map(job => job._id));
        state.jobs = action.payload.filter(job => !existingIds.has(job._id));
        state.newJobs = state.newJobs.concat(state.jobs);
      })
      .addCase(postJob.pending, (state) => {
        console.log(state.jobs, state.newJobs);
        // state.newJobs = [];
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteEmployee.fulfilled, () => {
      })
      .addCase(postEmployee.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDetails.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.details = action.payload;
        state.isLoading = false;
      })
  }
});

export const { resetJobSendingStatus, setSortDate } = jobProcess.actions;

export const selectSelf = (state: State) => state;
export const selectJob = createSelector(selectSelf, state => state.JOB);

export const getIsJobSendingStatus = createSelector(selectJob, (state: TJobProcess): SubmitStatus => state.isJobSendingStatus);
export const getIsLoading = createSelector(selectJob, (state: TJobProcess) => state.isLoading);

export const getSortDate = createSelector(selectJob, (state: TJobProcess) => state.sortDate);
export const getDetails = createSelector(selectJob, (state: TJobProcess) => state.details);
export const getEmployees = createSelector(selectJob, (state: TJobProcess) => state.employees);
export const getJobs = createSelector(selectJob, (state: TJobProcess) => state.jobs);
export const getNewJobs = createSelector(selectJob, (state: TJobProcess) => state.newJobs);
export const getJobsLength = createSelector(selectJob, (state: TJobProcess) => state.jobs.length);
