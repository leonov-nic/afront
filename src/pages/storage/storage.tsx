import { useLayoutEffect, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './storage.styled';

import MainLayout from '../../components/common/main-layout/main-layout';
import Container from '../../components/common/container/container';
import ControlBox from '../../components/control-box/control-box';
import Loading from '../../components/loading/loading';
import MainTableStorage from '../../components/main-table-storage/main-table-storage';
import useAuth from '../../hooks/useAuth';
import { AuthorizationStatus, UserType } from '../../const';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getUser } from '../../store/user-process/user-process';
import { getIsLoading } from '../../store/stotrehouse-process/storehouse-process';
import { fetchStoreHouse, fetchStoreHouseOperation } from '../../store/api-action';
import QueryProviderStoreOperations from '../../components/query-provider-store-operations/query-provider-store-operations';
import useQueryStoreOperations from '../../hooks/useQueryStoreOperations';

export default function Storage(): JSX.Element | null {
  console.log('render Storage');
  const {query} = useQueryStoreOperations()
  const isLoading = useAppSelector(getIsLoading);
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const statusAuthorization = useAuth();

  useEffect(() => {
    dispatch(fetchStoreHouseOperation(query))
  }, [dispatch, query]);

  useLayoutEffect(() => {
    if (user?.type !== UserType.Storage && user?.type !== UserType.Admin) {
      navigate('/');
    } else {
      Promise.all([
        dispatch(fetchStoreHouse()),
        dispatch(fetchStoreHouseOperation(query))
      ]).then(() => navigate('/storage'));
    }

    if (statusAuthorization !== AuthorizationStatus.Auth) {
      navigate('/entrance');
    }
  },[navigate, user?.type, statusAuthorization, pathname, dispatch, query]);

  if (isLoading && !user) {
    return (<Loading/>)
  }

  return (user?.type === UserType.Regular ? null :
    <MainLayout>
      <QueryProviderStoreOperations>
        <Helmet>
          <title>VOITTO-STORAGE</title>
        </Helmet>

        <S.Main>
          <Container>
            {<ControlBox />}
          </Container>

          <Container className="container" $mt="10px" $overflow="auto" style={{alignItems: 'center', display: 'flex', minHeight: '65vh', flexDirection: 'column'}}>
            <MainTableStorage />
          </Container>
          
        </S.Main>
      </QueryProviderStoreOperations>
    </MainLayout>
  );

}
