import * as S from './footer.styled';

export default function Footer(): JSX.Element {
  return (
    <S.StyledFooter>
      <S.FooterWrapper>
        <S.FooterText>Made For Voitto. {new Date().getFullYear()}</S.FooterText>
      </S.FooterWrapper>
    </S.StyledFooter>)
}
