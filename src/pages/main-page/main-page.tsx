import { Helmet } from 'react-helmet-async';
import { useCallback, useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
import * as S from './main-page.styled';
import { useAppDispatch } from '../../hooks/useAppDispatch';

import MainLayout from '../../components/common/main-layout/main-layout';
import Container from '../../components/common/container/container';

import FormAddJob from '../../components/form-add-job/form-add-job';
import MainTable from '../../components/main-table/main-table';
import ControlBox from '../../components/control-box/control-box';
import { Dayjs } from 'dayjs';
import { Query } from '../../types';
import { getDataAndResetTime } from '../../utils/utils';

// import {
//   getAuthorizationStatus,
// } from '../../store/user-process/user-process';
// import { useAppSelector } from '../../hooks/useAppSelector';
// import { AuthorizationStatus } from '../../const';
// import { useContext } from 'react';
// import { AuthContext } from '../../components/app/app';

import {
  fetchJobs,
  fetchEmployees,
  fetchDetails,
 } from '../../store/api-action';

import { baseQuery } from '../../const';

// import useAuth from '../../hooks/useAuth';

export default function MainPage(): JSX.Element {
  console.log('render MainPage');

  // const statusAuthorization = useAuth();
  // const statusAuthorization = useAppSelector(getAuthorizationStatus);
  // const authorizationStatus = useContext(AuthContext);
  // console.log(authorizationStatus);
  
  
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState(baseQuery);
  console.log(query);
  
  useEffect(() => {
    console.log('render MainPage useEffect');

    dispatch(fetchJobs(query));
    dispatch(fetchEmployees());
    dispatch(fetchDetails());

    return () => {
      console.log('unmounted mainPage');
    }

  }, [dispatch, query]);
  
  const onChangeDate = useCallback((date: Dayjs) => {
    setQuery((prev: Query) => ({
      ...prev,
      createdAt: getDataAndResetTime(date),
    }));
  }, []);

  const handleChangeButton = useCallback(() => {
    setQuery(prev => ({
      ...prev,
      offset: prev.offset + 1,
    }));
  }, []);


  return (
    <MainLayout>
      <Helmet>
        <title>VOITTO-app</title>
      </Helmet>

      <S.Main>
        <Container>
          <ControlBox onChangeDate={onChangeDate}/>
        </Container>

        <Container $paddingTablet="10px">
          <FormAddJob />
        </Container>

        <Container className="container" $mt="10px" $overflow="auto">
           <MainTable/>
        </Container>
 
        <Container className="container" $mt="10px" $overflow="auto">
          <button onClick={handleChangeButton} style={{width: '200px', height: '50px', display: 'block', margin: '0 auto'}}>ещё</button>
        </Container>
        
      </S.Main>
    </MainLayout>
  );
}
