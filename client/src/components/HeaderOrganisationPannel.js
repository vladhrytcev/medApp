import React, { Component } from "react";
import { func } from 'prop-types';
import styled, { withTheme } from "styled-components";

import { NavLink as RouterNavLink } from "react-router-dom";
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
  Toolbar,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { Power } from "react-feather";

import { authLogOut } from '../redux/actions/auth';



const propTypes = {
  authLogOut: func,
};




const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));


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

const GridIcons = styled(Grid)`
  border-left: 1px solid #5887ce;
`;

const GridContainer = styled(Grid)`
  min-height: 64px;
`;

const IconWrapper = styled(Grid)`
  height: 100%;
  padding: 0 20px;
`;

const FlagWrapper = styled(Grid)`
  height: 100%;
  padding: 0 10px;
`;

const NavMenu = styled(Grid)`
  text-align: center;
  a {
      color: inherit;
      text-decoration: none;
  }
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

  closeMenuWithoutLng = () => {
    this.setState({ anchorMenu: null });
  };

  setLanguageFlag = (i18n) => {
    switch(i18n.language) {
      case 'en':
        return "/static/img/flags/us.png";
      case 'de':
        return "/static/img/flags/de.png";
    }
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
              onClose={this.closeMenuWithoutLng}
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



const HeaderOrganisationPannel = ({ onDrawerToggle, authLogOut, hideSmallMenu }) => {
    
    const handleLogOut = () => {
        authLogOut();
    }
    return (
        <React.Fragment>
            <Translation>
                {(t, { i18n }) =>
                    <AppBar position="sticky" elevation={0}>
                        <Toolbar disableGutters variant='dense'>
                            <GridContainer container>
                                {!hideSmallMenu && 
                                    <Hidden mdUp>
                                        <Grid item>
                                        <GridContainer container alignItems="center" justify="flex-start">
                                            <Grid item>
                                                <IconButton
                                                    color="inherit"
                                                    aria-label="Open drawer"
                                                    onClick={onDrawerToggle}
                                                >
                                                    <MenuIcon />
                                                </IconButton>
                                            </Grid>
                                        </GridContainer>
                                        </Grid>
                                    </Hidden>
                                }
                                <Grid item xs>
                                    <GridContainer container alignItems="center" justify="flex-end">
                                        <NavMenu item xs={2}>
                                            <NavLink to={`/${i18n.language}/organisations/calendar`}>
                                                Dienste
                                            </NavLink>
                                        </NavMenu>
                                        <NavMenu item xs={2}>
                                            <NavLink to={`/${i18n.language}/organisations/jobUpload`}>
                                                Mein Personal
                                            </NavLink>
                                        </NavMenu>
                                        <NavMenu item xs={2}>
                                            <NavLink to={`/${i18n.language}/organisations/jobUpload`}>
                                                Neue Schnichtantrage
                                            </NavLink>
                                        </NavMenu>
                                        <NavMenu item xs={2}>
                                            <NavLink to={`/${i18n.language}/organisations/jobUpload`}>
                                                Rechnung
                                            </NavLink>
                                        </NavMenu>
                                        <Grid item>
                                            <IconWrapper container alignItems="center">
                                                <Grid item xs={12}>
                                                    <img
                                                        src="/static/img/icons/orgNotification.png"
                                                        alt='email'
                                                    />
                                                </Grid>
                                            </IconWrapper>
                                        </Grid>
                                    </GridContainer>
                                </Grid>
                                <Grid item>
                                    <GridContainer container>
                                        <GridIcons item xs>
                                            <IconWrapper container alignItems="center">
                                                <Grid item xs={12}>
                                                    <NavLink to={`/${i18n.language}/organisations/jobUpload`}>
                                                        <img
                                                            src="/static/img/icons/orgEmail.png"
                                                            alt='email'
                                                        />
                                                    </NavLink>
                                                </Grid>
                                            </IconWrapper>
                                        </GridIcons>
                                        <GridIcons item xs>
                                            <IconWrapper container alignItems="center">
                                                <Grid item xs={12}>
                                                    <NavLink to={`/${i18n.language}/organisations/jobUpload`}>
                                                        <img
                                                            src="/static/img/icons/orgSettings.png"
                                                            alt='settings'
                                                        />
                                                    </NavLink>
                                                </Grid>
                                            </IconWrapper>
                                        </GridIcons>
                                        <GridIcons item xs>
                                            <FlagWrapper container alignItems="center">
                                                <LanguageMenu />
                                            </FlagWrapper>
                                        </GridIcons>
                                        <GridIcons item xs>
                                            <IconWrapper container alignItems="center">
                                                <Grid item xs={12}>
                                                    <img
                                                        src="/static/img/icons/orgExit.png"
                                                        alt='exit'
                                                        onClick={handleLogOut}
                                                    />
                                                </Grid>
                                            </IconWrapper>
                                        </GridIcons>
                                    </GridContainer>
                                </Grid>
                            </GridContainer>
                        </Toolbar>
                    </AppBar>
                }
            </Translation>
        </React.Fragment>
)};


HeaderOrganisationPannel.propTypes = propTypes;

const mapDispatchToProps = (dispatch) => ({
  authLogOut: bindActionCreators(authLogOut, dispatch),
});

export default connect(null, mapDispatchToProps)(withTheme(HeaderOrganisationPannel));