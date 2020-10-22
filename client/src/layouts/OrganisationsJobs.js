import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import OrganisationPannelSidebar from "../components/OrganisationPannelSidebar";
import HeaderOrganisationPannel from "../components/HeaderOrganisationPannel";
import { spacing } from "@material-ui/system";
import {
  Hidden,
  CssBaseline,
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
          <Hidden mdUp implementation="js">
            <OrganisationPannelSidebar
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
            />
          </Hidden>
          <Hidden smDown implementation="css">
            <OrganisationPannelSidebar
              PaperProps={{ style: { width: drawerWidth } }}
            />
          </Hidden>
        </Drawer>
        <AppContent>
          <HeaderOrganisationPannel onDrawerToggle={this.handleDrawerToggle} />
          <MainContent p={isWidthUp("lg", width) ? 10 : 8}>
            {children}
          </MainContent>
        </AppContent>
      </Root>
    );
  }
}

export default withWidth()(Organisations);