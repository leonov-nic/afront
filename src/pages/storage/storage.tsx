import { useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './storage.styled';

import MainLayout from '../../components/common/main-layout/main-layout';
import Container from '../../components/common/container/container';
import ControlBox from '../../components/control-box/control-box';
// import MainTable from '../../components/main-table/main-table';
import useAuth from '../../hooks/useAuth';
import { AuthorizationStatus, UserType } from '../../const';
import {useAppSelector} from '../../hooks/useAppSelector';
import {getUser} from '../../store/user-process/user-process';

export default function Storage(): JSX.Element | null {
  console.log('render Storage');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);
  const user = useAppSelector(getUser);
  const statusAuthorization = useAuth();
  console.log(user?.type);
  useLayoutEffect(() => {
    if (user?.type !== UserType.Storage && user?.type !== UserType.Admin) {
      navigate('/');
    } else {
      navigate('/storage');
    }

    if (statusAuthorization !== AuthorizationStatus.Auth) {
      navigate('/entrance');
    }
  },[navigate, user?.type, statusAuthorization, pathname]);

  return (user?.type === UserType.Regular ? null :
    <MainLayout>
      <Helmet>
        <title>VOITTO-STORAGE</title>
      </Helmet>

      <S.Main>
        <Container>
          {<ControlBox />}
        </Container>

        <Container className="container" $mt="10px" $overflow="auto" style={{alignItems: 'center', display: 'flex', minHeight: '65vh', flexDirection: 'column'}}>
          <p style={{color: 'black'}}> тут будет таблица в зависимости от выбора синих кнопок, как мне кажется</p>
          {/* <MainTable/> */}
        </Container>
        
      </S.Main>
    </MainLayout>
  );
}
