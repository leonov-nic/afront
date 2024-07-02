import outHeader from '../../../assets/icons/out.svg?react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.color.curiousBlue};
`;

const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  @media (max-width: 1023px) {
    max-width: 100%;
    padding: 0 10px;
  }
`;

const HeaderTitle = styled.p`
  position: absolute;
  left: 50%;
  top: calc(50% - 10px);
  transform: translate(-50%);
  flex-shrink: 0;
  margin: 0;
  font-size: 18px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.white};

  @media (max-width: 850px) {

  }
`;

const StyledIconOut = styled(outHeader)`
  display: flex;
  width: 40px;
  height: 35px;
  color: ${({ theme }) => theme.color.nepal};
`

const HeaderUserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderAvatarWrapper = styled.div`
  position: relative;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  overflow: hidden;
  margin-right: 5px;

  & img {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HeaderUserName = styled.p.attrs({ className: 'user-name' })`
  margin: 0;
  font-weight: 700;
`;

// $isActiveLink &&
//   css`
//     color: ${({ theme }) => theme.color.color};
//   `}
// const HiddenText = styled.span.attrs({ className: 'visually-hidden' })``;

export {
  StyledHeader,
  HeaderWrapper,
  HeaderTitle,
  HeaderUserName,
  HeaderUserWrapper,
  HeaderTextWrapper,
  StyledIconOut,
  HeaderAvatarWrapper,
};
