import React, { Component } from "react";
import { func } from 'prop-types';
import styled from "styled-components";
import { Translation } from 'react-i18next';

import {
    Menu,
    MenuItem,
    IconButton as MuiIconButton,
  } from "@material-ui/core";



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

  export default LanguageMenu;