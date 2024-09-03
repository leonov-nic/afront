
import * as S from './header.styled';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getUser } from '../../../store/user-process/user-process';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { logoutUser } from '../../../store/api-action';
import { useNavigate, Link } from 'react-router-dom';
import { getDay } from '../../../utils/utils';
import Container from '../container/container';
import { CustomButton } from '../button/button';
import { useEffect, useState, ChangeEvent, MouseEvent, useRef } from 'react';
import { AuthorizationStatus } from '../../../const';
import useAuth from '../../../hooks/useAuth';
import useQuery from '../../../hooks/useQuery';
import { postAvatar } from '../../../store/api-action';

import {
  fetchJobs,
  fetchEmployees,
  fetchDetails,
 } from '../../../store/api-action';

export default function Header(): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const navigate = useNavigate();
  const statusAuthorization = useAuth();
  const { query } = useQuery();
  const [avatar, setAvatar] = useState<File | undefined>();


  
  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => { 
    const file = e.target.files?.[0];
    const formData = new FormData();
    file && formData.append('avatar', file);
    console.log(file);
    console.log(formData);
    // setAvatar(file);
    // console.log(avatar);
    if (file) {
      dispatch(postAvatar(formData)); 
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
