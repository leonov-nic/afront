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
import { Dayjs } from 'dayjs';

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
import { getDataNowWithResetTime } from '../../utils/utils';

export default function MainPage(): JSX.Element {
  const [query, setQuery] = useState(baseQuery);

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getIsLoading);
  const statusAuthorization = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    dispatch(fetchJobs(query))
    dispatch(fetchEmployees());
    dispatch(fetchDetails());
  },[dispatch, query]);

  const onChangeDate = (date: Dayjs | null) => {
    const newQuery = {...query, createdAt: date ? date.toISOString() : getDataNowWithResetTime()}
    setQuery(newQuery);
  }

  const handleChangeButton = () => {
    const newOffset =  (query.offset || 0) + 1;
    const newQuery = {...query, offset: newOffset}
    setQuery(newQuery);
  }


  return (
    statusAuthorization ? <MainLayout>
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
          {!isLoading ? <MainTable/> : <Loading/>}
        </Container>
 
        <Container className="container" $mt="10px" $overflow="auto">
          <button onClick={handleChangeButton} style={{width: '200px', height: '50px', display: 'block', margin: '0 auto'}}>ещё</button>
        </Container>

      </S.Main>
    </MainLayout> : <Navigate to='/entrance' />
  );
}
