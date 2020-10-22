import React from "react";
import { object, func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authLogOut } from '../../redux/actions/auth';
import LanguageMenu from '../../components/LanguageMenu';

import {
    HeaderWrapper,
    SendRequestHeaderButton,
    NavLink,
    NavLinkButton,
} from './styledComponent.js';


const propTypes = {
    local: object,
    authLogOut: func
};


function NavBarMenu({ local, authLogOut }) {
    const { t, i18n } = useTranslation();
  
    const handleLogOut = () => {
      authLogOut();
    }
  
    return (
      <React.Fragment>
        <HeaderWrapper>
          <Grid container justify="space-between" alignItems="center" spacing={0}>
              <Grid item xs={12} sm={2}>
                  <Typography variant="h6">
                      <LanguageMenu />
                  </Typography>
              </Grid>
              <Grid item>
                  <Grid container justify="flex-end" alignItems="center">
                      <Grid item>
                          <Typography variant="h6">
                              <NavLink to={`/${local.language}`}>{t('global.Clinics')}</NavLink>
                          </Typography>
                      </Grid>
                      <Grid item>
                          <Typography variant="h6">
                              <NavLink to={`/${local.language}/agencies`}>{t('global.Agencies')}</NavLink>
                          </Typography>
                      </Grid>
                      <Grid item>
                          <Typography variant="h6">
                              <NavLink to={`/${local.language}/howItWorks`}>{t('global.How_It_Works')}</NavLink>
                          </Typography>
                      </Grid>
                      <Grid item>
                          <Grid container spacing={4}>
                              <Grid item>
                                  <SendRequestHeaderButton>{t('global.send')}</SendRequestHeaderButton>
                              </Grid>
                              <Grid item>
                                  {!local.isAuthenticated ?
                                      <NavLinkButton to={`/${local.language}/auth/sign-in`}>
                                          <Button variant="outlined" color="primary">{t('global.login_button')}</Button>
                                      </NavLinkButton> :
                                      <Button variant="outlined" color="primary" onClick={handleLogOut}>{t('global.logout_button')}</Button>
                                  }
                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
              </Grid>
          </Grid>
        </HeaderWrapper>
      </React.Fragment>
    );
  }


NavBarMenu.propTypes = propTypes;

const mapStateToProps = (state) =>({
    local : state.local,
});

const mapDispatchToProps = (dispatch) => ({
    authLogOut: bindActionCreators(authLogOut, dispatch),
  });

export default connect(mapStateToProps, mapDispatchToProps)(NavBarMenu);