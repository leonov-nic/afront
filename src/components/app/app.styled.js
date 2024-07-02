import { createGlobalStyle } from 'styled-components';
import InterBoldWoff from '../../assets/fonts/inter-v12-cyrillic_latin-700.woff';
import InterBoldWoff2 from '../../assets/fonts/inter-v12-cyrillic_latin-700.woff2';
import InterRegularWoff from '../../assets/fonts/inter-v12-cyrillic_latin-regular.woff';
import InterRegularWoff2 from '../../assets/fonts/inter-v12-cyrillic_latin-regular.woff2';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-style: normal;
    font-weight: 700;
    font-family: "Inter";
    font-display: swap;
    src: url(${InterBoldWoff2}) format('woff2'), url(${InterBoldWoff}) format("woff");
  }

  @font-face {
    font-style: normal;
    font-weight: 400;
    font-family: "Inter";
    font-display: swap;
    src: url(${InterRegularWoff2}) format('woff2'), url(${InterRegularWoff}) format("woff");
  }

  *,
  *::before,
  *::after {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    min-width: 900px;
    height: 100%;
    font-size: 16px;
  }

  #root, .app {
    min-height: 100vh;
    min-width: 900px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  main {
    overflow: hidden;
    -ms-flex-negative: 1;
        flex-shrink: 1;
  }

  .main-entrance {
    max-height: 100%;
  }

  header, footer {
    -ms-flex-negative: 0;
        flex-shrink: 0;
  }

  footer {
    margin-top: auto;
  }

  body {
    font-family: 'Inter', Arial, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: ${({ theme }) => theme.font.semibase};
    line-height: 130%;
    color: ${({ theme }) => theme.color.white};
    font-feature-settings: 'pnum' on, 'lnum' on;

    background-color: ${({ theme }) => theme.color.bg};

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-synthesis: none;
  }

  a {
    color: ${({ theme }) => theme.color.black};
    text-decoration: none;
  }

  img,
  video {
    display: block;
    max-width: 100%;
    height: auto;
  }

  textarea {
    resize: none;
  }

  /* chrome autofill background removal */
  input:-webkit-autofill {
    box-shadow: inset 0 0 0 1000px transparent;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    -webkit-text-fill-color: ${({ theme }) => theme.color.grayFormText};
  }

  /* firefox placeholder \ invalid fix + ios bdrs */
  input {
    border-radius: 0;
  }

  input::placeholder {
    opacity: 1;
  }

  input:invalid {
    box-shadow: none;
  }

  /* chrome search X removal */
  input[type=search]::-webkit-search-decoration,
  input[type=search]::-webkit-search-cancel-button,
  input[type=search]::-webkit-search-results-button,
  input[type=search]::-webkit-search-results-decoration {
    -webkit-appearance: none;
            appearance: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
            appearance: none;
  }

  input[type=number] {
    -webkit-appearance: textfield;
       -moz-appearance: textfield;
            appearance: textfield;
  }

  /* ios button \ inputs reset */
  select,
  textarea,
  input:matches([type=email],
  [type=number],
  [type=password],
  [type=search],
  [type=tel],
  [type=text],
  [type=url]) {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
  }

  button,
  [type=button],
  [type=reset],
  [type=submit] {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    white-space: nowrap;
    border: 0;
    clip: rect(0 0 0 0);
    -webkit-clip-path: inset(100%);
            clip-path: inset(100%);
  }

  .scroll-lock-ios {
    position: fixed;
    overflow: hidden;
  }

  .scroll-lock {
    overflow: hidden;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-transition {
    -webkit-transition: none !important;
    -o-transition: none !important;
    transition: none !important;
  }

  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }

  .no-bm {
    margin-bottom: 0;
  }

  .container {
    scrollbar-width: thin;
    scrollbar-width: 8px;
    scrollbar-color: ${({ theme }) => theme.color.chambray} ${({ theme }) => theme.color.lightSeaGreen};

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.color.nepal};
    }

    &::-webkit-scrollbar-thumb {
      width: 8px;
      background-color: ${({ theme }) => theme.color.chambray};
    }
  }
`;
