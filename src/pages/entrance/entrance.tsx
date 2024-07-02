import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import FormMain from '../../components/form-main/form-main';
import {useAppSelector} from '../../hooks/useAppSelector';
import {getAuthorizationStatus} from '../../store/user-process/user-process';
import { AuthorizationStatus } from '../../const';
import {toast} from 'react-toastify';
import { useEffect } from 'react';
import './entrance.css';

import { getDay } from '../../utils/utils';

export default function Entrance(): JSX.Element {
  const statusAuthorization = useAppSelector(getAuthorizationStatus);

  useEffect(() => {

    if (statusAuthorization === AuthorizationStatus.Auth ) {
      toast.info('Добро пожаловать');
    }

  },[statusAuthorization]);


  return (
    statusAuthorization !== AuthorizationStatus.Auth ?
      <main>
        <Helmet>
          <title>VOITTO</title>
        </Helmet>

        <section className="entrance">
          <h2 className="visually-hidden">вход в приложение</h2>
          <div className="container">
            <div className="entrance__wrapper">
              <p className="entrance__title">today: {getDay()}</p>
              <FormMain />
            </div>
          </div>
        </section>
      </main> : <Navigate to='/' />
  );
}
