import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  position: relative;
  padding: 5px 10px;
  text-align: center;
  background-color: ${({ theme }) => theme.color.mulledWine};

  &::before {
    position: absolute;
    display: block;
    left: 0;
    top: -10px;
    content: "";
    width: 100%;
    height: 10px;
    background-color: ${({ theme }) => theme.color.nepal};
  }
`;

const FooterText = styled.p`
  margin: 0;
`;

export {
  StyledFooter,
  FooterWrapper,
  FooterText,
};
