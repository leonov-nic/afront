// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/app';
import {ToastContainer} from 'react-toastify';
import { Provider } from 'react-redux';
import {store} from './store/index';
import { fetchUserStatus } from './store/api-action';
import { createContext } from 'react';

store.dispatch(fetchUserStatus());

export const AuthContext = createContext('');

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position='top-center'
        theme='colored'
        autoClose={2000}
      />
       <AuthContext.Provider value={'AUTH'}>
        <App />
       </AuthContext.Provider>
    </Provider>
  // {/* </React.StrictMode>, */}
)
