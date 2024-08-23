import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import * as S from './main-page.styled';
import { useAppDispatch } from '../../hooks/useAppDispatch';

import MainLayout from '../../components/common/main-layout/main-layout';
import Container from '../../components/common/container/container';
import FormAddJob from '../../components/form-add-job/form-add-job';
import MainTable from '../../components/main-table/main-table';
import ControlBox from '../../components/control-box/control-box';

import useQuery from '../../hooks/useQuery';
import {
  fetchJobs,
  fetchEmployees,
  fetchDetails,
 } from '../../store/api-action';



export default function MainPage(): JSX.Element {
  console.log('render MainPage');
  
  const { query, onChangeOffset  } = useQuery();
  console.log(query);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('render MainPage useEffect');

    dispatch(fetchJobs(query));
    dispatch(fetchEmployees());
    dispatch(fetchDetails());

    return () => {
      console.log('unmounted mainPage');
    }

  }, [dispatch, query]);
  
  return (
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

        <Container className="container" $mt="10px" $overflow="auto">
          <MainTable/>
        </Container>

        <Container className="container" $mt="10px" $overflow="auto">
          <button onClick={onChangeOffset} style={{width: '200px', height: '50px', display: 'block', margin: '0 auto'}}>ещё</button>
        </Container>
        
      </S.Main>
    </MainLayout>
  );
}
