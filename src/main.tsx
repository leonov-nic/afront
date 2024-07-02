import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/app';
import {ToastContainer} from 'react-toastify';
import { Provider } from 'react-redux';
import {store} from './store/index';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position='top-center'
        theme='colored'
        autoClose={2000}
      />
      <App />
    </Provider>
  </React.StrictMode>,
)
