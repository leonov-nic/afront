import { Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLayoutEffect } from 'react';
import * as S from './main-page.styled';

import MainLayout from '../../components/common/main-layout/main-layout';
import Container from '../../components/common/container/container';
import FormAddJob from '../../components/form-add-job/form-add-job';
import MainTable from '../../components/main-table/main-table';
import ControlBox from '../../components/control-box/control-box';
import ButtonAddJobs from '../../components/button-add-jobs/button-add-jobs';

import { AuthorizationStatus, UserType } from '../../const';
import useAuth from '../../hooks/useAuth';
import {useAppSelector} from '../../hooks/useAppSelector';
import {getUser} from '../../store/user-process/user-process';

export default function MainPage(): JSX.Element {
  console.log('render MainPage');
  const user = useAppSelector(getUser);
  const statusAuthorization = useAuth();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (user?.type === UserType.Storage) {
      navigate('/storage');
    }

  },[navigate, user?.type]);

  return (statusAuthorization === AuthorizationStatus.Auth ?
    <MainLayout>
      <Helmet>
        <title>VOITTO-app</title>
      </Helmet>

      <S.Main>
        <Container>
          <ControlBox />
        </Container>

        <Container $paddingTablet="10px">
          <FormAddJob />
        </Container>

        <Container className="container" $mt="10px" $overflow="auto" style={{alignItems: 'center', display: 'flex', minHeight: '65vh', flexDirection: 'column'}}>
          <MainTable/>
          <ButtonAddJobs/>
        </Container>
        
      </S.Main>
    </MainLayout> : <Navigate to="/entrance" replace />
  );
}
