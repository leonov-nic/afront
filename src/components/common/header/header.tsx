
import * as S from './header.styled';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getUser } from '../../../store/user-process/user-process';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { logoutUser } from '../../../store/api-action';
import { getDay } from '../../../utils/utils';
import Container from '../container/container';
import { CustomButton } from '../button/button';

export default function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

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
