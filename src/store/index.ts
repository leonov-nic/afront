import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import {createAPI} from '../services/api';
import browserHistory from '../browser-history';
import { fetchUserStatus } from './api-action';

export const api = createAPI();

export const store = configureStore({
  reducer:rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api,
          browserHistory
        },
      },
    })
});

store.dispatch(fetchUserStatus());
