import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import FormMain from '../../components/form-main/form-main';
import {useAppSelector} from '../../hooks/useAppSelector';
import {getUser} from '../../store/user-process/user-process';
import { AuthorizationStatus, UserType } from '../../const';
import {toast} from 'react-toastify';
import { useLayoutEffect } from 'react';
import './entrance.css';
// import useDebounce from '../../hooks/use-debounce';
import { getDay } from '../../utils/utils';
import useAuth from '../../hooks/useAuth';

export default function Entrance(): JSX.Element {
  const navigate = useNavigate();
  const user = useAppSelector(getUser);
  const statusAuthorization = useAuth();
  // const str = useDebounce(statusAuthorization);
  useLayoutEffect(() => {
    if (statusAuthorization !== AuthorizationStatus.Auth ) {
      return;
    }
    if (user?.type === UserType.Storage) {
      toast.info('Welcome');
      navigate('/storage');
    } else {
      toast.info('Welcome');
      navigate('/');
    } 
  },[statusAuthorization, navigate, user]);


  return (
      <main>
        <Helmet>
          <title>VOITTO</title>
        </Helmet>

        <section className="entrance">
          <h2 className="visually-hidden">Login to the application</h2>
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
