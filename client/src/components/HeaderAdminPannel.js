import React, { Component } from "react";
import { func } from 'prop-types';
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Translation } from 'react-i18next';
import {
  Grid,
  Hidden,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { Power } from "react-feather";

import { authLogOut } from '../redux/actions/auth';



const propTypes = {
  authLogOut: func,
};



const AppBar = styled(MuiAppBar)`
  background: ${props => props.theme.header.background};
  color: ${props => props.theme.header.color};
  box-shadow: ${props => props.theme.shadows[1]};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Flag = styled.img`
  border-radius: 50%;
  width: 22px;
  height: 22px;
`;

class LanguageMenu extends Component {
  state = {
    anchorMenu: null
  };

  toggleMenu = event => {
    this.setState({ anchorMenu: event.currentTarget });
  };

  closeMenu = (i18n, lng) => {
    this.setState({ anchorMenu: null });
    i18n.changeLanguage(lng);
  };

  setLanguageFlag = (i18n) => {
    return i18n.language === 'de' ? "/static/img/flags/de.png" : "/static/img/flags/us.png"
  }

  render() {
    const { anchorMenu } = this.state;
    const open = Boolean(anchorMenu);

    return (
      <Translation>
        {(t, { i18n }) =>
          <React.Fragment>
            <IconButton
              aria-owns={open ? "menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={this.toggleMenu}
              color="inherit"
            >
              <Flag src={this.setLanguageFlag(i18n)} alt="flag" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorMenu}
              open={open}
              onClose={this.closeMenu}
            >
              <MenuItem
                onClick={() => {
                  this.closeMenu(i18n, 'en');
                }}
              >
                English
              </MenuItem>
              <MenuItem
                onClick={() => {
                  this.closeMenu(i18n, 'de');
                }}
              >
                German
              </MenuItem>
            </Menu>
          </React.Fragment>
        }
      </Translation>
    );
  }
}

class UserMenu extends Component {
  state = {
    anchorMenu: null
  };

  toggleMenu = event => {
    this.setState({ anchorMenu: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorMenu: null });
  };

  handleLogOut = () => {
    this.props.authLogOut();
    this.setState({ anchorMenu: null });
  }

  render() {
    const { anchorMenu } = this.state;
    const open = Boolean(anchorMenu);

    return (
      <React.Fragment>
        <IconButton
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={this.toggleMenu}
          color="inherit"
        >
          <Power />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorMenu}
          open={open}
          onClose={this.closeMenu}
        >
          <MenuItem
            onClick={this.handleLogOut}
          >
            Sign out
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

const HeaderAdminPannel = ({ onDrawerToggle, authLogOut }) => (
  <React.Fragment>
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Grid container alignItems="center">
          <Hidden mdUp>
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={onDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Hidden>
          <Grid item>
          </Grid>
          <Grid item xs />
          <Grid item>
            <LanguageMenu />
            <UserMenu authLogOut={authLogOut} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </React.Fragment>
);


HeaderAdminPannel.propTypes = propTypes;

const mapDispatchToProps = (dispatch) => ({
  authLogOut: bindActionCreators(authLogOut, dispatch),
});

export default connect(null, mapDispatchToProps)(withTheme(HeaderAdminPannel));