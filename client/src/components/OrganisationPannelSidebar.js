import React from "react";
import styled from "styled-components";
import { rgba } from "polished";

import { NavLink as RouterNavLink, withRouter } from "react-router-dom";
import { darken } from "polished";

import PerfectScrollbar from "react-perfect-scrollbar";
import "../vendor/perfect-scrollbar.css";

import { spacing } from "@material-ui/system";

import {
  Box as MuiBox,
  Collapse,
  Chip,
  ListItem,
  ListItemText,
  Drawer as MuiDrawer,
  List as MuiList,
  Typography
} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { Layers } from "react-feather";
import { Translation } from 'react-i18next';
import { organisationsJobs as orgRoutes } from "../routes/index";



const routes = orgRoutes.filter(item => !!item.leftBar);


const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Box = styled(MuiBox)(spacing);

const Drawer = styled(MuiDrawer)`
  border-right: 0;
  
  > div {
    border-right: 0;
  }
`;

const Scrollbar = styled(PerfectScrollbar)`
  background-color: 'inherit';
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const List = styled(MuiList)`
  background-color: 'inherit';
  padding-top: ${props => props.theme.spacing(2.5)}px;
  padding-bottom: ${props => props.theme.spacing(2.5)}px;
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
  }
`;


const Category = styled(ListItem)`
  padding-top: ${props => props.theme.spacing(3)}px;
  padding-bottom: ${props => props.theme.spacing(3)}px;
  padding-left: ${props => props.theme.spacing(6)}px;
  padding-right: ${props => props.theme.spacing(5)}px;
  font-weight: ${props => props.theme.typography.fontWeightRegular};
  color: inherit;
  margin-top: ${props => props.theme.spacing(5)}px;
  margin-bottom: ${props => props.theme.spacing(5)}px;

  svg {
    color: 'inherit';
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  &.${props => props.activeClassName} {
    background-color: ${props => props.theme.header.background};
  }
`;

const CategoryText = styled(ListItemText)`
  margin: 0;
  span {
    color: 'inherit';
    font-size: ${props => props.theme.typography.body1.fontSize}px;
    font-weight: ${props => props.theme.typography.fontWeightRegular};
    padding: 0 ${props => props.theme.spacing(4)}px;
  }
`;

const CategoryIconLess = styled(ExpandLess)`
  color: 'inherit';
`;

const CategoryIconMore = styled(ExpandMore)`
  color: 'inherit';
`;

const Link = styled(ListItem)`
  padding-left: ${props => props.theme.spacing(14)}px;
  padding-top: ${props => props.theme.spacing(2)}px;
  padding-bottom: ${props => props.theme.spacing(2)}px;

  span {
    color: 'inherit';
  }

  &:hover span {
    color: 'inherit';
  }

  &.${props => props.activeClassName} {
    background-color: ${props => props.theme.header.background};

    span {
      color: 'inherit';
    }
  }
`;

const LinkText = styled(ListItemText)`
  color: 'inherit';
  span {
    font-size: ${props => props.theme.typography.body1.fontSize}px;
  }
  margin-top: 0;
  margin-bottom: 0;
`;

const LinkBadge = styled(Chip)`
  font-size: 11px;
  font-weight: ${props => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 12px;
  top: 8px;
  background: ${props => props.theme.sidebar.badge.background};

  span.MuiChip-label,
  span.MuiChip-label:hover {
    cursor: pointer;
    color: ${props => props.theme.sidebar.badge.color};
    padding-left: ${props => props.theme.spacing(2)}px;
    padding-right: ${props => props.theme.spacing(2)}px;
  }
`;

const CategoryBadge = styled(LinkBadge)`
  top: 12px;
`;


const Dot = styled.span`
  width: 12px;
  height: 12px;
  margin-right: 4px;
  background-color: ${props => props.theme.sidebar.footer.online.background};
  display: inline-block;
  border-radius: 50%;
  margin-bottom: -0.5px;
`;

const AvatarUser = styled(Avatar)`
  margin: 50px auto 10px;
  width: ${props => props.theme.spacing(20)}px !important;
  height: ${props => props.theme.spacing(20)}px !important;
`;

const UserName = styled.div`
  margin-bottom: 40px;
  text-align: center;
  color: ${props => props.theme.palette.primary.main};
`;



function SidebarCategory({
  name,
  icon,
  classes,
  isOpen,
  isCollapsable,
  badge,
  ...rest
}) {
  return (
    <Category {...rest}>
      {icon}
      <CategoryText>{name}</CategoryText>
      {isCollapsable ? (
        isOpen ? (
          <CategoryIconMore />
        ) : (
          <CategoryIconLess />
        )
      ) : null}
      {badge ? <CategoryBadge label={badge} /> : ""}
    </Category>
  );
}

function SidebarLink({ name, to, badge, location }) {
  return (
    <Link
      button
      dense
      component={NavLink}
      // exact
      to={to}
      activeClassName={location.pathname.indexOf(to) !== -1 ? "active" : ''}
    >
      <LinkText>{name}</LinkText>
      {badge ? <LinkBadge label={badge} /> : ""}
    </Link>
  );
}

class OrganisationPannelSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggle = index => {
    Object.keys(this.state).forEach(
      item =>
        this.state[index] ||
        this.setState(() => ({
          [item]: false
        }))
    );

    this.setState(state => ({
      [index]: !state[index]
    }));
  };

  componentWillMount() {
    const pathName = this.props.location.pathname;

    routes.forEach((route, index) => {
      const isActive = pathName.indexOf(route.path) === 0;
      const isOpen = route.open;
      const isHome = route.containsHome && pathName === "/" ? true : false;

      this.setState(() => ({
        [index]: isActive || isOpen || isHome
      }));
    });
  }

  render() {
    const { classes, staticContext, location, ...other } = this.props;

    return (
      <Drawer variant="permanent" {...other}>
        <Translation>
          {(t, { i18n }) =>
            <React.Fragment>
              <Brand />
              <Scrollbar>
                <AvatarUser>Avatar</AvatarUser>
                <UserName>User name</UserName>
                <List disablePadding>
                    {routes.map((category, index) => (
                      <React.Fragment key={index}>
                        {category.children ? (
                          <React.Fragment key={index}>
                            <SidebarCategory
                              isOpen={!this.state[index]}
                              isCollapsable={true}
                              name={category.id}
                              icon={category.icon}
                              button={true}
                              onClick={() => this.toggle(index)}
                            />

                            <Collapse
                              in={this.state[index]}
                              timeout="auto"
                              unmountOnExit
                            >
                              {category.children.filter(item => !item.internal).map((route, index) => (
                                <SidebarLink
                                  key={index}
                                  name={route.name}
                                  to={`/${i18n.language}${route.path}`}
                                  icon={route.icon}
                                  badge={route.badge}
                                  location={location}
                                />
                              ))}
                            </Collapse>
                          </React.Fragment>
                        ) : (
                          <SidebarCategory
                            isCollapsable={false}
                            name={category.id}
                            to={`/${i18n.language}${category.path}`}
                            activeClassName="active"
                            component={NavLink}
                            icon={category.icon}
                            exact
                            badge={category.badge}
                          />
                        )}
                      </React.Fragment>
                    ))}
                </List>
              </Scrollbar>
            </React.Fragment>
          }
        </Translation>
      </Drawer>
    );
  }
}

export default withRouter(OrganisationPannelSidebar);