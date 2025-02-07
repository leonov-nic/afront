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
  QueryByMonth,
  TStoreHouseDTO,
  TStoreHouse,
  TStoreHouseOperation,
  TStoreHouseOperationDTO,
  TStoreHouseOperationRDO,
  TStoreEditDTO,
  QueryStorehouseOperations
} from '../types';
import { baseQueryOperations } from '../const';

import type { History } from 'history';
// import type { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Token } from '../utils/utils';

type ThunkApiConfig = {
  api: AxiosInstance;
  browserHistory: History;
}

export const fetchUserStatus = createAsyncThunk<TUser, undefined,  { extra: ThunkApiConfig }>(
  'user/fetchUserStatus',
  async (_, { extra }) => {
    const { api, browserHistory } = extra;

    try {
      const { data: user } = await api.get<UserWithTokenDto>('api/users');
      return user;
    } catch (error) {
      // const axiosError = error as AxiosError;
      // throw axiosError;
      Token.drop();
      browserHistory.push('/entrance');
      return Promise.reject(error);

    }
  },
);

export const loginUser = createAsyncThunk<TUser, TSubmitUser, { extra: ThunkApiConfig }>(
  'user/loginUser',
  async ({email, password}, { extra }) => {
    const { api } = extra;
    const {data: user, status} = await api.post<UserWithTokenDto>('api/users/login', {email, password});

    if (status === 200) {
      user.token && Token.save(user.token);
    }
    return user;
  },
);

export const logoutUser = createAsyncThunk<void, undefined, { extra: ThunkApiConfig }>(
  'user/logoutUser',
  async (_, { extra }) => {
    await extra.api.delete<void>('api/users/logout');
    Token.drop();
  });

export const registerUser = createAsyncThunk<void, UserRegister, { extra: ThunkApiConfig }>(
  'user/registerUser',
  async ({ email, password, type }, { dispatch, extra }) => {
    const { api, browserHistory } = extra;

    const { status } = await api.post<UserDto>('api/users/register', {email, password, type});

    if (status === 201) {
      const action = await dispatch(loginUser({ email, password }));

      if (action.type === loginUser.fulfilled.type) {
        await dispatch(fetchUserStatus());
      }

      browserHistory.push('/');
    }
  });

export const postAvatar = createAsyncThunk<void, File, { extra: ThunkApiConfig }>(
  'user/postAvatar',
  async (avatar, { extra }) => {
    const formData = new FormData();
    formData.append('avatar', avatar); 
    const { api, browserHistory } = extra;
    await api.post(`api/users/avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data',  }
    });
    browserHistory.push('/');
  });


export const fetchJobsByMonth = createAsyncThunk<TJobRDO[], QueryByMonth, { extra: ThunkApiConfig }>(
  'app/fetchJobsByMonth',
  async (params, { extra }) => {
    const { createdAt, filterByMonth, limit = 300 } = params;
    const { api } = extra;

    const {data} = await api.get<TJobRDO[]>(`api/jobs/`, 
    {
      params: {
        createdAt,
        limit,
        filterByMonth,
      }
    });
    return data;
  },
);

export const fetchJobs = createAsyncThunk<TJobRDO[], Query, { extra: ThunkApiConfig }>(
  'app/fetchJobs',
  async (params, { extra }) => {
    const { api } = extra;

    const {data} = await api.get<TJobRDO[]>(`api/jobs/`, 
    {
      params: {
        createdAt: params.createdAt,
        limit: params.limit,
        offset: params.offset
      }
    });
    return data;
  },
);

export const deleteJob = createAsyncThunk<void, TJobRDO['_id'], { extra: ThunkApiConfig }>
('app/deleteJob',
  async (_id, { extra, dispatch }) => {
    const { api, browserHistory } = extra;
    try {
      await dispatch(fetchUserStatus());
      const {data} = await api.delete<void>(`api/jobs/${_id}`);
      browserHistory.push('/');
      return data;
    } catch (error) {
      browserHistory.push('/entrance');
      return Promise.reject(error);
    }
  },
);


export const editJob = createAsyncThunk<TUpdateJob | undefined, TUpdateJob, { extra: ThunkApiConfig }>(
  'app/editJob',
  async (job, { extra, dispatch }) => {
    const { api, browserHistory } = extra;
    try {
      await dispatch(fetchUserStatus());
      const { data } = await api.put<TUpdateJob>(`api/jobs/${job._id}`, job);
      return data;
    } catch (error) {
      browserHistory.push('/entrance');
      return Promise.reject(error);
    }
  }
);

export const postJob = createAsyncThunk<TJob | undefined, TJob, { extra: ThunkApiConfig }>(
  'app/postJob',
  async (job, { extra, dispatch }) => {
    const { api, browserHistory } = extra;
    try {
      await dispatch(fetchUserStatus());
      const { data: newJob} = await api.post<TJob>('api/jobs', job);
      return newJob;
    } catch (error) {
      browserHistory.push('/entrance');
      return Promise.reject(error);
    }
  }
);

export const fetchEmployees = createAsyncThunk<TEmployee[], undefined, { extra: ThunkApiConfig }>(
  'app/fetchEmployees',
  async (_, { extra }) => {
    const { api } = extra;
    const {data} = await api.get<TEmployee[]>('api/employees');
    return data;
  },
);

export const editEmployee = createAsyncThunk<TEditEmployee, TEditEmployee, { extra: ThunkApiConfig }>(
  'app/editEmployee',
  async (employee, { extra, dispatch }) => {
    const { api } = extra;
    const { data } = await api.put<TEmployee>(`api/employees/${employee._id}`, employee);
    await dispatch(fetchEmployees());
    return data;
  }
);

export const postEmployee = createAsyncThunk<TNewEmployee, TNewEmployee, { extra: ThunkApiConfig }>(
  'app/postEmployee',
  async (employee, { extra, dispatch }) => {
    const { api } = extra;
    const { data } = await api.post<TNewEmployee>('api/employees', employee);
    await dispatch(fetchEmployees());
    return data;
  }
);

export const deleteEmployee = createAsyncThunk<void, TEmployee['_id'], { extra: ThunkApiConfig }>(
  'app/deleteEmployee',
  async (_id, { extra, dispatch }) => {
    const { api } = extra;
    const {data} = await api.delete<void>(`api/employees/${_id}`);
    await dispatch(fetchEmployees());
    return data;
  },
);

export const fetchDetails = createAsyncThunk<TDetail[], undefined, { extra: ThunkApiConfig }>(
  'app/fetchDetails',
  async (_, { extra }) => {
    const { api } = extra;
    const {data} = await api.get<TDetail[]>('api/details');
    return data;
  },
);

export const postDetail = createAsyncThunk<TNewDetail, TNewDetail, { extra: ThunkApiConfig }>(
  'app/postDetail',
  async (detail, { extra, dispatch }) => {
    const { api } = extra;
    const { data } = await api.post<TNewDetail>('api/details', detail);
    await dispatch(fetchDetails());
    return data;
  }
);

export const editDetail = createAsyncThunk<TNewDetail & Pick<TJob, 'detailId'> , TNewDetail & Pick<TJob, 'detailId'>, { extra: ThunkApiConfig }>(
  'app/editDetail',
  async (detail, { extra, dispatch }) => {
    const { api } = extra;
    const { data } = await api.put<TNewDetail & Pick<TJob, 'detailId'>>(`api/details/${detail.detailId}`, detail);
    await dispatch(fetchDetails());
    return data;
  }
);

export const fetchStoreHouse = createAsyncThunk<TStoreHouse[], undefined, { extra: ThunkApiConfig }>(
  'app/fetchStoreHouse',
  async (_, { extra }) => {
    const { api } = extra;
    const {data} = await api.get<TStoreHouse[]>('api/storehouse');
    return data;
  },
);

export const postStoreHouse = createAsyncThunk<TStoreHouse, TStoreHouseDTO, { extra: ThunkApiConfig }>(
  'app/postStoreHouse',
  async (storePosition, { extra, dispatch }) => {
    const { api } = extra;
    const { data } = await api.post<TStoreHouse>('api/storehouse', storePosition);
    await dispatch(fetchStoreHouse());
    return data;
  }
);

export const editStoreHouse = createAsyncThunk<TStoreHouse, TStoreEditDTO, { extra: ThunkApiConfig }>(
  'app/editStoreHouse',
  async (position, { extra, dispatch }) => {
    const { api } = extra;
    const { data } = await api.put<TStoreHouse>(`api/storehouse/${position.productId}`, position);
    await dispatch(fetchStoreHouse());
    await dispatch(fetchStoreHouseOperation({}));
    return data;
  }
);

export const deleteStoreHouse = createAsyncThunk<void, TStoreHouse['_id'], { extra: ThunkApiConfig }>(
  'app/deleteStoreHouse',
  async (id, { extra, dispatch }) => {
    const { api } = extra;
    const { data } = await api.delete<void>(`api/storehouse/${id}`);
    await dispatch(fetchStoreHouse());
    return data;
  }
);

export const fetchStoreHouseOperation = createAsyncThunk<TStoreHouseOperationRDO[], QueryStorehouseOperations, { extra: ThunkApiConfig }>(
  'app/fetchStoreHouseOperation',
  async (params, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<TStoreHouseOperationRDO[]>(`api/storeoperation`, 
    {
      params: {
        limit: params.limit,
        page: params.page,
        type: params.type,
        typeProduct: params.typeProduct,
        createdAt: params.createdAt,
      }
    });

    return data;
  },
);

export const postStoreHouseOperation = createAsyncThunk<TStoreHouseOperationDTO, TStoreHouseOperationDTO, { extra: ThunkApiConfig }>(
  'app/postStoreHouseOperation',
  async (storeOperation, { extra, dispatch }) => {
    const { api } = extra;
    const { data } = await api.post<TStoreHouseOperationDTO>('api/storeoperation', storeOperation);
    await dispatch(fetchStoreHouseOperation(baseQueryOperations));
    await dispatch(fetchStoreHouse());
    return data;
  }
);

export const deleteStoreHouseOperation = createAsyncThunk<void, TStoreHouseOperation['_id'], { extra: ThunkApiConfig }>(
  'app/deleteStoreHouseOperation',
  async (id, { extra, dispatch }) => {
    const { api } = extra;
    const { data } = await api.delete<void>(`api/storeoperation/${id}`);
    await dispatch(fetchStoreHouseOperation(baseQueryOperations));
    await dispatch(fetchStoreHouse());
    return data;
  }
);
