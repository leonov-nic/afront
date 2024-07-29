import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import * as S from './main-page.styled';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

import Loading from '../../components/loading/loading';
import MainLayout from '../../components/common/main-layout/main-layout';
import Container from '../../components/common/container/container';

import FormAddJob from '../../components/form-add-job/form-add-job';
import MainTable from '../../components/main-table/main-table';
import ControlBox from '../../components/control-box/control-box';

import {
  getIsLoading,
} from '../../store/job-process/job-process';

import {
  getAuthorizationStatus,
} from '../../store/user-process/user-process';

import {
  fetchJobs,
  fetchEmployees,
  fetchDetails
 } from '../../store/api-action';

 import { baseQuery } from '../../const';

export default function MainPage(): JSX.Element {
  const [query, setQuery] = useState(baseQuery);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getIsLoading);
  const statusAuthorization = useAppSelector(getAuthorizationStatus);

  // const q = {
  //   offset: 4,
  //   createdAt: "2024-07-29T12:43:31.146Z",
  // }
  // setQuery(q);

  useEffect(() => {

    dispatch(fetchJobs(query))
    dispatch(fetchEmployees());
    dispatch(fetchDetails());
  },[dispatch, query]);

  // const { pathname } = useLocation() as { pathname: AppRoute };

  // const RootClassName: Record<AppRoute, string> = {
  //   [AppRoute.Root]: 'page--gray page--main',
  //   [AppRoute.Login]: 'page--gray page--login',
  //   [AppRoute.Register]: 'page--gray page--login',
  //   [AppRoute.Favorites]: favoriteOffers.length === 0 ? 'page--favorites-empty' : '',
  //   [AppRoute.Property]: '',
  //   [AppRoute.Add]: '',
  //   [AppRoute.Edit]: '',
  //   [AppRoute.NotFound]: '',
  // };

  // <div className={`page ${RootClassName[pathname]}`}>

  return (
    statusAuthorization ? <MainLayout>
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

        <Container className="container" $mt="10px" $overflow="auto">
          {!isLoading ? <MainTable/> : <Loading/>}
        </Container>

      </S.Main>
    </MainLayout> : <Navigate to='/entrance' />
  );
}
