import { ThemeProvider } from 'styled-components';
import { appTheme } from './common';
import * as S from './app.styled';


import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
// import PrivateRoute from '../private-route/private-route';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';

import MainPage from '../../pages/main-page/main-page';
import Entrance from '../../pages/entrance/entrance';
import NotFound from '../../pages/not-found/not-found';
import Storage from '../../pages/storage/storage';

import AuthProvider from '../auth-provider/auth-provider';
import QueryProvider from '../query-provider/query-provaider';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={appTheme}>
      <S.GlobalStyle />
      <HelmetProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HistoryRouter history={browserHistory}>
            <AuthProvider>
              <QueryProvider>
                <Routes>
                  <Route
                    path={'/'}
                    element={
                      //<PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={'/entrance'}>
                        <MainPage />
                      //</PrivateRoute>
                    }
                  />                
                  <Route path={'/entrance'} element={<Entrance />} />
                  <Route path={'/storage'} element={<Storage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </QueryProvider>
            </AuthProvider>
          </HistoryRouter>
        </LocalizationProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
