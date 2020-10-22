import React from "react";
import { connect } from "react-redux";

// import DateFnsUtils from "@date-io/date-fns";
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { LocalizationProvider } from "@material-ui/pickers";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import maTheme from "./theme";
import Routes from "./routes/Routes";

function App({ theme }) {
  return (
    <StylesProvider injectFirst>
      <LocalizationProvider dateAdapter={DateFnsUtils}>
        <MuiThemeProvider theme={maTheme[theme.currentTheme]}>
          <ThemeProvider theme={maTheme[theme.currentTheme]}>
            <Routes />
          </ThemeProvider>
        </MuiThemeProvider>
      </LocalizationProvider>
    </StylesProvider>
  );
}

export default connect(store => ({ theme: store.themeReducer }))(App);
