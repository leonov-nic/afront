
import * as S from './header.styled';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getUser } from '../../../store/user-process/user-process';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { logoutUser } from '../../../store/api-action';
import { useNavigate } from 'react-router-dom';
import { getDay } from '../../../utils/utils';
import Container from '../container/container';
import { CustomButton } from '../button/button';
import { useEffect } from 'react';
import { AuthorizationStatus } from '../../../const';
import useAuth from '../../../hooks/useAuth';
import useQuery from '../../../hooks/useQuery';
import {
  fetchJobs,
  fetchEmployees,
  fetchDetails,
 } from '../../../store/api-action';

export default function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const navigate = useNavigate();
  const statusAuthorization = useAuth();
  const { query } = useQuery();

  useEffect(() => {
    if (statusAuthorization === AuthorizationStatus.NoAuth ) {
      navigate('/entrance');
    }

    dispatch(fetchJobs(query));
    dispatch(fetchEmployees());
    dispatch(fetchDetails());

  }, [statusAuthorization, navigate, dispatch, query]);

  const handleOutUser = () => {
    dispatch(logoutUser());
  }

  return (
    <S.StyledHeader>
      <Container>
        <S.HeaderWrapper>
          <p>Today: {getDay()}</p>
          <S.HeaderTitle>Working time of employes</S.HeaderTitle>

          <S.HeaderUserWrapper>
            <CustomButton onClick={handleOutUser} sx={{backgroundColor: 'transparent', '&:hover': {opacity: '0.5', backgroundColor: 'transparent'},}}>
              <S.StyledIconOut/>
            </CustomButton>
            <S.HeaderTextWrapper>
              <S.HeaderAvatarWrapper>
                <img src={user?.avatar} alt="avatar" width="42px" height="42px"/>
              </S.HeaderAvatarWrapper>
              <S.HeaderUserName>{user?.email}</S.HeaderUserName>
            </S.HeaderTextWrapper>
          </S.HeaderUserWrapper>
        </S.HeaderWrapper>
      </Container>
    </S.StyledHeader>
  );
}
