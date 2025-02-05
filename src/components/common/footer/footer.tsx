import { useLocation, Link } from 'react-router-dom';

import { CustomButton } from '../button/button';
import * as S from './footer.styled';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getUser } from '../../../store/user-process/user-process';
import { UserType } from '../../../const';
import CheckAvailability from '../../check-availability/check-availability';

export default function Footer(): JSX.Element {
  const { pathname } = useLocation();
  const user = useAppSelector(getUser);
  return (
    <S.StyledFooter>
      <S.FooterWrapper>
        {user?.type === UserType.Admin ? <Link to={pathname !== '/storage' ? '/storage' : '/'}>
          <CustomButton
            sx={{ 
              position: 'relative',
              left: 0,
              display: 'flex',
              fontSize: '12px',
              color: 'white', 
              backgroundColor: `${pathname !== '/storage' ? '#247cc1' : '#e4ba48'}`,
              borderRadius: 1.5,
              boxShadow: "none", py: 1.7, px: 5, mx: 7, 
              width: 'fit-content',
              '&:hover': {backgroundColor: '#7690a0'}
            }}
          >{pathname !== '/storage' ? 'Storage' : 'To main'}</CustomButton>
        </Link> : null}

        <S.FooterText style={{
          marginLeft: pathname !== '/storage' ? 'calc(50% - 340px)' : 'auto', marginRight: pathname !== '/storage' ? 'auto' : 'auto'}}>Made For Voitto. {new Date().getFullYear()}</S.FooterText>
        <CheckAvailability></CheckAvailability>
      </S.FooterWrapper>
    </S.StyledFooter>)
}
