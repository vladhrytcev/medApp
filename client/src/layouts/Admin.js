import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import AdminPannelSidebar from "../components/AdminPannelSidebar";
import HeaderAdminPannel from "../components/HeaderAdminPannel";
import Footer from "../components/Footer";

import { spacing } from "@material-ui/system";
import {
  Hidden,
  CssBaseline,
  Paper as MuiPaper,
  withWidth
} from "@material-ui/core";

import { isWidthUp } from "@material-ui/core/withWidth";

const drawerWidth = 260;

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${props => props.theme.body.background};
  }
`;

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

class AdminLayout extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { children, routes, width } = this.props;

    return (
      <Root>
        <CssBaseline />
        <GlobalStyle />
        <Drawer>
          <Hidden mdUp implementation="js">
            <AdminPannelSidebar
              routes={routes}
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
            />
          </Hidden>
          <Hidden smDown implementation="css">
            <AdminPannelSidebar
              routes={routes}
              PaperProps={{ style: { width: drawerWidth } }}
            />
          </Hidden>
        </Drawer>
        <AppContent>
          <HeaderAdminPannel onDrawerToggle={this.handleDrawerToggle} />
          <MainContent p={isWidthUp("lg", width) ? 10 : 8}>
            {children}
          </MainContent>
          <Footer />
        </AppContent>
      </Root>
    );
  }
}

export default withWidth()(AdminLayout);