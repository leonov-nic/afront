import  { combineReducers } from '@reduxjs/toolkit';
import { userProcess } from './user-process/user-process';
import { jobProcess } from './job-process/job-process';
import { storeHouseProcess } from './stotrehouse-process/storehouse-process';

const rootReducer = combineReducers({
  'USER': userProcess.reducer,
  'JOB': jobProcess.reducer,
  'STOREHOUSE': storeHouseProcess.reducer,
});

export default rootReducer;
