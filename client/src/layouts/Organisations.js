import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import OrganisationPannelSidebar from "../components/OrganisationPannelSidebar";
import HeaderOrganisationPannel from "../components/HeaderOrganisationPannel";
import { spacing } from "@material-ui/system";
import {
  Hidden,
  CssBaseline,
  ListItem,
  Paper as MuiPaper,
  withWidth
} from "@material-ui/core";
import { isWidthUp } from "@material-ui/core/withWidth";



const drawerWidth = 260;


const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${props => props.theme.breakpoints.up("md")} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: calc(100vw - 15px);
  @media (min-width: 960px) {
    width: calc(100vw - ${drawerWidth}px - 15px)
  }
`;

const Brand = styled(ListItem)`
  font-size: ${props => props.theme.typography.h5.fontSize};
  font-weight: ${props => props.theme.typography.fontWeightMedium};
  color: ${props => props.theme.sidebar.header.color};
  background-color: ${props => props.theme.palette.primary.main};
  font-family: ${props => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${props => props.theme.spacing(6)}px;
  padding-right: ${props => props.theme.spacing(6)}px;
  
  ${props => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
    position: fixed;
  }
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${props => props.theme.body.background};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

class Organisations extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { children, width } = this.props;

    return (
      <Root>
        <CssBaseline />
        <Drawer>
          <Hidden smDown implementation="css">
            <Brand />
          </Hidden>
        </Drawer>
        <AppContent>
          <HeaderOrganisationPannel 
            onDrawerToggle={this.handleDrawerToggle} 
            hideSmallMenu={true}
          />
          <MainContent p={isWidthUp("lg", width) ? 10 : 8}>
            {children}
          </MainContent>
        </AppContent>
      </Root>
    );
  }
}

export default withWidth()(Organisations);