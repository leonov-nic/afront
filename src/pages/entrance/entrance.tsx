import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import FormMain from '../../components/form-main/form-main';
// import {useAppSelector} from '../../hooks/useAppSelector';
// import {getAuthorizationStatus} from '../../store/user-process/user-process';
import { AuthorizationStatus } from '../../const';
import {toast} from 'react-toastify';
import { useEffect } from 'react';
import './entrance.css';
import useDebounce from '../../hooks/use-debounce';
import { getDay } from '../../utils/utils';
import useAuth from '../../hooks/useAuth';

export default function Entrance(): JSX.Element {
  const navigate = useNavigate();
  // const statusAuthorization = useAppSelector(getAuthorizationStatus);
  const statusAuthorization = useAuth();
  const str = useDebounce(statusAuthorization);
  useEffect(() => {

    if (str === AuthorizationStatus.Auth ) {
      toast.info('Добро пожаловать');
      navigate('/');
    }

  },[str, navigate]);


  return (
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
      </main>
  );
}
