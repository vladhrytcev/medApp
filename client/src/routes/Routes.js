import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { I18nextProvider, Translation, useTranslation } from 'react-i18next';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { history } from '../index';
import {
  dashboard as dashboardRoutes,
  auth as authRoutes,
  mainApp as mainAppRoutes,
  adminPannel as AdminPannelRoutes,
  organisations as OrganisationsRoutes,
  organisationsJobs as OrganisationsJobsRouters
} from "./index";

import async from "../components/Async";

import ReactGA from 'react-ga';

import DashboardLayout from "../layouts/Dashboard";
import MainAppWrapper from "../layouts/MainAppWrapper";
import AdminLayout from "../layouts/Admin";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";
import i18n from '../i18n';
import { prefixPath } from '../helpers';
import ProtectedAuthRoute from './ProtectedAuthRoute';
import { changeLanguage } from '../redux/actions/local';
import AgenciesLandingPage from "../pages/AgenciesLandingPage";
import HowItWorksLandingPage from "../pages/HowItWorksLandingPage";
import LandingPage from "../pages/Landing";
import { HomePage } from '../pages';
import ResetPassword from "../pages/auth/ResetPassword";
import SignUp from "../pages/auth/SignUp";
import SignIn from "../pages/auth/SignIn";
import OrganisationsLayout from "../layouts/Organisations";
import OrganisationsJobsLayout from "../layouts/OrganisationsJobs";

import { GlobalStyle } from '../pages/globalStyles';
import DeletingDialog from "../components/DeleteDialog";
import ScrollToTop from "../components/scrollToTop";




// const childRoutes = (Layout, routes) =>
//   routes.map(({ children, path, component: Component }, index) =>
//     children ? (
//       // Route item with children
//       children.map(({ path, component: Component }, index) => (
//         <Route
//           key={index}
//           path={prefixPath(path, ':locale')}
//           exact
//           render={props => (
//             <Layout>
//               <Component {...props} />
//             </Layout>
//           )}
//         />
//       ))
//     ) : (
//       // Route item without children
//       <Route
//         key={index}
//         path={prefixPath(path, ':locale')}
//         exact
//         render={props => (
//           <Layout>
//             <Component {...props} />
//           </Layout>
//         )}
//       />
//     )
//   );


const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      childRoutes(Layout, children)
    ) : (
        // Route item without children
        <Route
          key={index}
          path={prefixPath(path, ':locale')}
          exact
          render={props => (
            <>
              <GlobalStyle />
              <Layout>
                <Component {...props} />
              </Layout>
            </>
          )}
        />
      )
  );


// const Routes = () => (
//   <ConnectedRouter history={history}>
//       <I18nextProvider i18n={i18n}>
//         <Translation>
//           {(t, { i18n }) =>
//             <Switch>
//               <Route
//                 path='/'
//                 exact
//               >
//                 {<Redirect to={`/${i18n.language}`} />}
//               </Route>
//               <Route
//                 path='/:locale'
//                 exact
//                 render={() => (
//                   <MainAppWrapper>
//                     <LandingPage />
//                   </MainAppWrapper>
//                 )}
//               />
//               {childRoutes(DashboardLayout, dashboardRoutes)}
//               {/* {childRoutes(AuthLayout, authRoutes)} */}
//               <ProtectedAuthRoute
//                 path='/:locale/auth/sign-in'
//                 exact
//                 component={SignIn}
//               />
//               <ProtectedAuthRoute
//                 path='/:locale/auth/sign-up'
//                 exact
//                 component={SignUp}
//               />
//               <ProtectedAuthRoute
//                 path='/:locale/auth/reset-password'
//                 exact
//                 component={ResetPassword}
//               />
//               <Route
//                 path='/'
//                 exact
//                 render={() => (
//                   <MainAppWrapper>
//                     <LandingPage />
//                   </MainAppWrapper>
//                 )}
//               />
//               <Route
//                 render={() => (
//                   <AuthLayout>
//                     <Page404 />
//                   </AuthLayout>
//                 )}
//               />
//             </Switch>
//           }
//         </Translation>
//       </I18nextProvider>
//   </ConnectedRouter>
// );

ReactGA.initialize(process.env.REACT_APP_TRACKING_ID);

const Routes = ({ changeLanguage, router, local }) => {
  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    if (local.language === i18n.language) return;
    changeLanguage(i18n.language);

    const rawPath = router.location.pathname.slice(1).split('/');
    rawPath[0] = i18n.language;
    const newPath = `/${rawPath.join('/')}`;

    history.push(newPath);
  }, [i18n.language]);
  
  history.listen((location, action) => {
    ReactGA.pageview(location.pathname + location.search);
  });

  return (
    <Fragment>
      <ConnectedRouter history={history}>
	    <ScrollToTop />
        <I18nextProvider i18n={i18n}>
          <Switch>
            <Route
              path='/'
              exact
            >
              {<Redirect to={`/${i18n.language}`} />}
            </Route>
            {/*<Route
              path='/:locale/agencies'
              exact
              render={() => (
                <>
                  <GlobalStyle />
                  <AgenciesLandingPage />
                </>
              )}
            />
            <Route
              path='/:locale/howItWorks'
              exact
              render={() => (
                <>
                  <GlobalStyle />
                  <HowItWorksLandingPage />
                </>
              )}
            />*/}
            {childRoutes(DashboardLayout, dashboardRoutes)}
            {childRoutes(AdminLayout, AdminPannelRoutes)}
            {childRoutes(OrganisationsLayout, OrganisationsRoutes)}
            {childRoutes(OrganisationsJobsLayout, OrganisationsJobsRouters)}
            {/* {childRoutes(AuthLayout, authRoutes)} */}
            <ProtectedAuthRoute
              path='/:locale/auth/sign-in'
              exact
              component={SignIn}
            />
            <ProtectedAuthRoute
              path='/:locale/auth/sign-up'
              exact
              component={SignUp}
            />
            <ProtectedAuthRoute
              path='/:locale/auth/reset-password'
              exact
              component={ResetPassword}
            />
            <Route
              path='/:locale'
              render={({ match }) => (
                <React.Fragment>
                  <GlobalStyle />
                  {/* <LandingPage /> */}
                  <HomePage match={match} />
                </React.Fragment>
              )}
            />
            <Route
              render={() => (
                <AuthLayout>
                  <Page404 />
                </AuthLayout>
              )}
            />
          </Switch>
        </I18nextProvider>
      </ConnectedRouter>
      <DeletingDialog />
    </Fragment>
  )
};

const mapStateToProps = (state) => ({
  router: state.router,
  local: state.local
});


const mapDispatchToProps = (dispatch) => ({
  changeLanguage: bindActionCreators(changeLanguage, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
