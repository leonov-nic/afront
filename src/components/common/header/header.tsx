
import * as S from './header.styled';
import { useEffect, ChangeEvent, MouseEvent, useRef } from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getUser } from '../../../store/user-process/user-process';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useNavigate, Link } from 'react-router-dom';


import Container from '../container/container';
import { CustomButton } from '../button/button';
import { getDay } from '../../../utils/utils';
import { AuthorizationStatus } from '../../../const';
import useAuth from '../../../hooks/useAuth';
import useQuery from '../../../hooks/useQuery';

import {
  fetchJobs,
  fetchEmployees,
  fetchDetails,
  fetchUserStatus,
  logoutUser,
  postAvatar,
 } from '../../../store/api-action';

export default function Header(): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const navigate = useNavigate();
  const statusAuthorization = useAuth();
  const { query } = useQuery();

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => { 
    const file = e.target.files?.[0];
    if (file) {
      const data = await dispatch(postAvatar(file)); 
      if (data.meta.requestStatus === 'fulfilled') {
        await dispatch(fetchUserStatus());
      }
    }
  };

  useEffect(() => {
    if (statusAuthorization === AuthorizationStatus.NoAuth ) {
      navigate('/entrance');
    }

    dispatch(fetchJobs(query));
    dispatch(fetchEmployees());
    dispatch(fetchDetails());

  }, [statusAuthorization, navigate, dispatch, query]);

  const handleOutUser = async () => {
    await dispatch(logoutUser());
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
              <form>
                <S.HeaderAvatarWrapper>
                  <Link to={''} onClick={handleLinkClick}>
                    <img src={user?.avatar} alt="avatar" width="42px" height="42px"/>
                  </Link>

                </S.HeaderAvatarWrapper>
                <input onChange={handleFileChange} ref={fileInputRef} type="file" id="avatar" name="avatar" className="visually-hidden"  style={{position: 'absolute', height: '42px', width: '42px', background: 'red'}}/>
              </form>
              <S.HeaderUserName>{user?.email}</S.HeaderUserName>
            </S.HeaderTextWrapper>
          </S.HeaderUserWrapper>
        </S.HeaderWrapper>
      </Container>
    </S.StyledHeader>
  );
}
