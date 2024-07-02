import {
  TJobRDO,
  TJob,
  TUpdateJob,
  TUser,
  TEmployee,
  TEditEmployee,
  TNewEmployee,
  TDetail,
  TNewDetail,
  UserWithTokenDto,
  UserDto,
  UserRegister,
  TSubmitUser,
  Query,
} from '../types';


import type { History } from 'history';
// import type { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Token } from '../utils/utils';
import { baseQuery } from '../const';

type ThunkApiConfig = {
  api: AxiosInstance;
  browserHistory: History;
}

export const fetchUserStatus = createAsyncThunk<TUser, undefined,  { extra: ThunkApiConfig }>(
  'user/fetchUserStatus',
  async (_, { extra }) => {
    const { api } = extra;

    try {
      const { data: user } = await api.get<UserWithTokenDto>('/users');
      return user;
    } catch (error ) {
      // const axiosError = error as AxiosError;
      // Token.drop();

      return Promise.reject(error);
    }
  },
);

export const loginUser = createAsyncThunk<TUser, TSubmitUser, { extra: ThunkApiConfig }>(
  'user/loginUser',
  async ({email, password}, { extra }) => {
    const { api } = extra;
    const {data: user, status} = await api.post<UserWithTokenDto>('/users/login', {email, password});

    if (status === 200) {
      user.token && Token.save(user.token);
    }
    return user;
  },
);

export const logoutUser = createAsyncThunk<void, undefined, { extra: ThunkApiConfig }>(
  'user/logoutUser',
  async (_, { extra }) => {
    await extra.api.delete<void>('/users/logout');
    Token.drop();
  });

  export const registerUser = createAsyncThunk<void, UserRegister, { extra: ThunkApiConfig }>(
    'user/registerUser',
    async ({ email, password, type }, { dispatch, extra }) => {
      const { api, browserHistory } = extra;

      const { status } = await api.post<UserDto>('/users/register', {email, password, type});

      if (status === 201) {
        const action = await dispatch(loginUser({ email, password }));

        if (action.type === loginUser.fulfilled.type) {
          await dispatch(fetchUserStatus());
        }

        browserHistory.push('/');
      }
    });

export const fetchJobs = createAsyncThunk<TJobRDO[], Query, { extra: ThunkApiConfig }>(
  'app/fetchJobs',
  async (params, { extra }) => {
    const { api } = extra;
    const {data} = await api.get<TJobRDO[]>(`/jobs/createdAt=${params.createdAt}&limit=${params.limit}`);
    return data;
  },
);

export const deleteJob = createAsyncThunk<void, TJobRDO['_id'], { extra: ThunkApiConfig }>
('app/deleteJob',
  async (_id, { extra, dispatch }) => {
    const { api, browserHistory } = extra;
    const {data} = await api.delete<void>(`/jobs/${_id}`);
    await dispatch(fetchJobs(baseQuery));
    browserHistory.push('/');
    return data;
  },
);

export const editJob = createAsyncThunk<TUpdateJob, TUpdateJob, { extra: ThunkApiConfig }>(
  'app/editJob',
  async (job, { extra, dispatch }) => {
    const { api } = extra;
    const { data } = await api.put<TUpdateJob>(`/jobs/${job._id}`, job);
    await dispatch(fetchEmployees());
    await dispatch(fetchJobs(baseQuery));
    return data;
  }
);

export const postJob = createAsyncThunk<TJob, TJob, { extra: ThunkApiConfig }>(
  'app/postJob',
  async (job, { extra, dispatch  }) => {
    const { api } = extra;
    const { data: newJob} = await api.post<TJob>('/jobs', job);
    await dispatch(fetchJobs(baseQuery));
    return newJob;
  }
);

export const fetchEmployees = createAsyncThunk<TEmployee[], undefined, { extra: ThunkApiConfig }>(
  'app/fetchEmployees',
  async (_, { extra }) => {
    const { api } = extra;
    const {data} = await api.get<TEmployee[]>('/employees');
    return data;
  },
);

export const editEmployee = createAsyncThunk<TEditEmployee, TEditEmployee, { extra: ThunkApiConfig }>(
  'app/editEmployee',
  async (employee, { extra, dispatch }) => {
    const { api } = extra;
    const { data } = await api.put<TEmployee>(`/employees/${employee._id}`, employee);
    await dispatch(fetchEmployees());
    await dispatch(fetchJobs(baseQuery));
    return data;
  }
);

export const postEmployee = createAsyncThunk<TNewEmployee, TNewEmployee, { extra: ThunkApiConfig }>(
  'app/postEmployee',
  async (employee, { extra, dispatch }) => {
    const { api } = extra;
    const { data } = await api.post<TNewEmployee>('/employees', employee);
    await dispatch(fetchEmployees());
    return data;
  }
);

export const deleteEmployee = createAsyncThunk<void, TEmployee['_id'], { extra: ThunkApiConfig }>(
  'app/deleteEmployee',
  async (_id, { extra, dispatch }) => {
    const { api, browserHistory } = extra;
    const {data} = await api.delete<void>(`/employees/${_id}`);
    await dispatch(fetchEmployees());
    browserHistory.push('/');
    return data;
  },
);

export const fetchDetails = createAsyncThunk<TDetail[], undefined, { extra: ThunkApiConfig }>(
  'app/fetchDetails',
  async (_, { extra }) => {
    const { api } = extra;
    const {data} = await api.get<TDetail[]>('/details');
    return data;
  },
);

export const postDetail = createAsyncThunk<TNewDetail, TNewDetail, { extra: ThunkApiConfig }>(
  'app/postDetail',
  async (detail, { extra, dispatch }) => {
    const { api } = extra;
    const { data } = await api.post<TNewDetail>('/details', detail);
    await dispatch(fetchDetails());
    return data;
  }
);

