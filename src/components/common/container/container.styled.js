import styled from 'styled-components';

const Container = styled.div(style => ({
  width: "100%",
  maxWidth: "1400px",
  margin: "0 auto",
  maxHeight: style.$mh,
  marginTop: style.$mt,
  padding: style.$padding,
  marginBottom: style.$mb,
  overflowY: style.$overflow,

  "@media (max-width: 1023px)": {
    padding: style.$paddingTablet,
  }
}));

export { Container };
