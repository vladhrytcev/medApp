import styled, { createGlobalStyle } from "styled-components";
import { NavLink } from "react-router-dom";


export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    min-height: 100vh;
  }

  body {
    margin: 0;
    background: ${props => props.theme.body.background};
  }

  @font-face {
    font-family: 'Poppins';
    src: url('/static/fonts/Poppins-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url('/static/fonts/Gilroy-Semibold.woff2') format('woff2'),
         url('/static/fonts/Gilroy-Semibold.woff') format('woff'),
         url('/static/fonts/Gilroy-Semibold.ttf') format('truetype');
    font-style: normal;
    font-weight: 600;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url('/static/fonts/Gilroy-Bold.woff2') format('woff2'),
         url('/static/fonts/Gilroy-Bold.woff') format('woff'),
         url('/static/fonts/Gilroy-Bold.ttf') format('truetype');
    font-style: normal;
    font-weight: 700;
    font-display: swap;
  }

  @font-face {
    font-family: 'OpenSans';
    src: url('/static/fonts/OpenSans-Regular.woff2') format('woff2'),
         url('/static/fonts/OpenSans-Regular.woff') format('woff'),
         url('/static/fonts/OpenSans-Regular.ttf') format('truetype');
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }

  /* #root>div {
    font-family: 'Gilroy', 'Poppins';
  } */
`;

export const RouterNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.theme.palette.primary.main}
`;