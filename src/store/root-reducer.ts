import  { combineReducers } from '@reduxjs/toolkit';
import { userProcess } from './user-process/user-process';
import { jobProcess } from './job-process/job-process';

const rootReducer = combineReducers({
  'USER': userProcess.reducer,
  'JOB': jobProcess.reducer,
});

export default rootReducer;
