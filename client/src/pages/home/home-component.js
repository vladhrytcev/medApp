import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Header, Footer } from './layouts';
import { Medlink, Innovation, Partners, AboutUs, AGB, Impressum } from './pages';

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    fontSize: '1.125rem',
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.colors.textPrimary,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem'
    }
  }
}));

export const HomeComponent = ({ match, local, specialities, specialistSearchRequest, authLogOut, sendForm }) => {
  const { i18n } = useTranslation();
  const classes = useStyles();

  useEffect(() => {
    specialistSearchRequest();
  }, [specialistSearchRequest]);

  const handleChangeLanguage = lng => {
    i18n.changeLanguage(lng);
  }

  const handleLogOut = () => {
    authLogOut();
  };

  return (
    <div className={classes.root}>
      <Header homeUrl={match.url} local={local} onClickLogOut={handleLogOut} onChangeLanguage={handleChangeLanguage} />
      <Switch>
        <Route path={match.url} exact render={props => <Medlink specialities={specialities} {...props} sendForm={sendForm} />} />
        <Route path={`${match.url}/innovation`} exact component={Innovation} />
        <Route path={`${match.url}/partners`} exact component={Partners} />
        <Route path={`${match.url}/about-us`} exact component={AboutUs} />
		<Route path={`${match.url}/terms`} exact component={AGB} />
		<Route path={`${match.url}/imprint`} exact component={Impressum} />
      </Switch>
      <Footer homeUrl={match.url} />
    </div>);
}

HomeComponent.propTypes = {};
