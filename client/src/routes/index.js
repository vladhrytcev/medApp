import React from "react";

import async from "../components/Async";

import {
  BookOpen,
  CheckSquare,
  Grid,
  Heart,
  Layout,
  List,
  Map,
  PieChart,
  Sliders,
  Users,
  Home
} from "react-feather";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminAgenciesList from "../pages/admin/AdminAgenciesList";
import AdminAgency from "../pages/admin/AdminAgency";
import AdminAgencyUsers from "../pages/admin/AdminAgencyUsers";
import AdminAddNewAgency from "../pages/admin/AdminAddNewAgency";
import AdminAddNewAgencyUser from "../pages/admin/AdminAddNewAgencyUser";
import AdminAddNewAgencyCustomer from "../pages/admin/AdminAddNewAgencyCustomer";
import AdminAgencyCustomer from "../pages/admin/AdminAgencyCustomer";
import AdminOrganisationsList from "../pages/admin/AdminOrganisationsList";
import AdminOrganisation from "../pages/admin/AdminOrganisation";
import AdminAddNewOrganisation from "../pages/admin/AdminAddNewOrganisation";
import AdminOrganisationPictures from "../pages/admin/AdminOrganisationPictures";
import AdminOrganisationUser from "../pages/admin/AdminOrganisationUser";
import AdminAddNewDepartment from "../pages/admin/AdminAddNewDepartment";
import AdminDepartment from "../pages/admin/AdminDepartment";
import AdminAddNewDepartmentUser from "../pages/admin/AdminAddNewDepartmentUser";
import AdminDepartmentUser from "../pages/admin/AdminDepartmentUser";
import AdminAddNewDepartmentCustomer from "../pages/admin/AdminAddNewDepartmentCustomer";
import AdminDepartmentCustomer from "../pages/admin/AdminDepartmentCustomer";
import AdminPersonUsersList from "../pages/admin/AdminPersonUsersList";
import AdminPersonAgenciesList from "../pages/admin/AdminPersonAgenciesList";
import AdminPersonOrgsList from "../pages/admin/AdminPersonOrgsList";
import AdminPersonDepartmentsList from "../pages/admin/AdminPersonDepartmentsList";
import AdminAddNewPersonUser from "../pages/admin/AdminAddNewPersonUser";
import AdminPersonUserProfile from "../pages/admin/AdminPersonUserProfile";
import AdminPersonAgencyProfile from "../pages/admin/AdminPersonAgencyProfile";
import AdminPersonOrgsProfile from '../pages/admin/AdminPersonOrgsProfile';
import AdminPersonDepartmentProfile from '../pages/admin/AdminPersonDepartmentProfile';
import AdminPersonAdminsList from '../pages/admin/AdminPersonAdminsList';
import AdminPersonAdminProfile from '../pages/admin/AdminPersonAdminProfile';



//// Organisations ///////////
import JobUpload from '../pages/Organisations/JobUpload';
import JobUpdate from '../pages/Organisations/JobUpdate';
import OrganisationCalendar from '../pages/Organisations/OrganisationCalendar';
import OpenLayouts from '../pages/Organisations/Confirmation';
import ExternalLayouts from '../pages/Organisations/ExterneAnfagen';
import AllApplicants from '../pages/Organisations/OffeneShifts';
import OrgsDashboard from '../pages/Organisations/OrgsDashboard';

// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"));
const SignUp = async(() => import("../pages/auth/SignUp"));
const ResetPassword = async(() => import("../pages/auth/ResetPassword"));
const Page404 = async(() => import("../pages/auth/Page404"));
const Page500 = async(() => import("../pages/auth/Page500"));

// Components components
const Avatars = async(() => import("../pages/components/Avatars"));
const Badges = async(() => import("../pages/components/Badges"));
const Buttons = async(() => import("../pages/components/Buttons"));
const Cards = async(() => import("../pages/components/Cards"));
const Chips = async(() => import("../pages/components/Chips"));
const Dialogs = async(() => import("../pages/components/Dialogs"));
const ExpPanels = async(() => import("../pages/components/ExpansionPanels"));
const Lists = async(() => import("../pages/components/Lists"));
const Menus = async(() => import("../pages/components/Menus"));
const Progress = async(() => import("../pages/components/Progress"));
const Snackbars = async(() => import("../pages/components/Snackbars"));
const Tooltips = async(() => import("../pages/components/Tooltips"));

// Dashboards components
const Default = async(() => import("../pages/dashboards/Default"));
const Analytics = async(() => import("../pages/dashboards/Analytics"));

// Forms components
const Pickers = async(() => import("../pages/forms/Pickers"));
const SelectionCtrls = async(() => import("../pages/forms/SelectionControls"));
const Selects = async(() => import("../pages/forms/Selects"));
const TextFields = async(() => import("../pages/forms/TextFields"));

// Icons components
const MaterialIcons = async(() => import("../pages/icons/MaterialIcons"));
const FeatherIcons = async(() => import("../pages/icons/FeatherIcons"));

// Pages components
const Blank = async(() => import("../pages/pages/Blank"));
const Invoice = async(() => import("../pages/pages/Invoice"));
const Pricing = async(() => import("../pages/pages/Pricing"));
const Profile = async(() => import("../pages/pages/Profile"));
const Settings = async(() => import("../pages/pages/Settings"));
const Tasks = async(() => import("../pages/pages/Tasks"));
const Projects = async(() => import("../pages/pages/Projects"));

// Tables components
const SimpleTable = async(() => import("../pages/tables/SimpleTable"));
const AdvancedTable = async(() => import("../pages/tables/AdvancedTable"));

// Chart components
const Chartjs = async(() => import("../pages/charts/Chartjs"));

// Maps components
const GoogleMaps = async(() => import("../pages/maps/GoogleMaps"));
const VectorMaps = async(() => import("../pages/maps/VectorMaps"));

// Documentation
const Docs = async(() => import("../pages/docs/Documentation"));




const dashboardAdminRoutes = {
  id: "Dashboard",
  path: "/admin/dashboard",
  icon: <Sliders />,
  children: [
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      component: AdminDashboard
    }
  ]
};

const agenciesAdminRoutes = {
  id: "Agencies",
  path: "/admin/agencies",
  icon: <Layout />,
  children: [
    {
      path: "/admin/agencies",
      name: "Agencies List",
      component: AdminAgenciesList
    },
    {
      path: "/admin/agencies/:id",
      name: "Agency",
      internal: true,
      component: AdminAgency
    },
    {
      path: "/admin/agencies/:id/:user",
      name: "Agency User",
      internal: true,
      component: AdminAgencyUsers
    },
    {
      path: "/admin/addNewAgencies",
      name: "Add New Agency",
      internal: true,
      component: AdminAddNewAgency
    },
    {
      path: "/admin/addNewAgencyUser/:agencyId",
      name: "Add New Agency User",
      internal: true,
      component: AdminAddNewAgencyUser
    },
    {
      path: "/admin/addNewAgencyCustomer/:agencyId",
      name: "Add New Agency Customer",
      internal: true,
      component: AdminAddNewAgencyCustomer
    },
    {
      path: "/admin/agencyCustomer/:id/:customer",
      name: "Agency Customer",
      internal: true,
      component: AdminAgencyCustomer
    },
    {
      path: "/admin/addNewDepartment/:orgId",
      name: "Add New Department",
      internal: true,
      component: AdminAddNewDepartment
    },
  ]
};

const orgsAdminRoutes = {
  id: "OrganisationsAdmin",
  path: "/admin/organisation",
  icon: <Home />,
  children: [
    {
      path: "/admin/organisation",
      name: "Organisations List",
      component: AdminOrganisationsList
    },
    {
      path: "/admin/organisation/:id",
      name: "Organisation",
      internal: true,
      component: AdminOrganisation
    },
    {
      path: "/admin/addNewOrganisation",
      name: "Add New Agency",
      internal: true,
      component: AdminAddNewOrganisation
    },
    {
      path: "/admin/viewOrganisationPicts/:orgId/:picId",
      name: "Organisation Pictures",
      internal: true,
      component: AdminOrganisationPictures
    },
    {
      path: "/admin/organisation/:id/:user",
      name: "Organisation User",
      internal: true,
      component: AdminOrganisationUser
    },
    {
      path: "/admin/department/:orgId/:depId",
      name: "Organisation department",
      internal: true,
      component: AdminDepartment
    },
    {
      path: "/admin/addNewDepartmentUser/:orgId/:depId",
      name: "Department New User",
      internal: true,
      component: AdminAddNewDepartmentUser
    },
    {
      path: "/admin/departmentUsers/:orgId/:depId/:userId",
      name: "Department User",
      internal: true,
      component: AdminDepartmentUser
    },
    {
      path: "/admin/addNewDepartmentCustomer/:orgId/:depId",
      name: "Department New User",
      internal: true,
      component: AdminAddNewDepartmentCustomer
    },
    {
      path: "/admin/departmentCustomers/:orgId/:depId/:userId",
      name: "Department Customer",
      internal: true,
      component: AdminDepartmentCustomer
    },
  ]
};

const personsAdminRoutes = {
  id: "Persons",
  path: "/admin/persons/users",
  icon: <Users />,
  children: [
    {
      path: "/admin/persons/users",
      name: "Users List",
      component: AdminPersonUsersList
    },
    {
      path: "/admin/persons/agencies",
      name: "Agencies List",
      component: AdminPersonAgenciesList
    },
    {
      path: "/admin/persons/organisations",
      name: "Organisations List",
      component: AdminPersonOrgsList
    },
    {
      path: "/admin/persons/departments",
      name: "Departments List",
      component: AdminPersonDepartmentsList
    },
    {
      path: "/admin/persons/admins",
      name: "Admins List",
      component: AdminPersonAdminsList
    },
    {
      path: "/admin/addNewPersonUser/:personType",
      name: "Add New User",
      internal: true,
      component: AdminAddNewPersonUser
    },
    {
      path: "/admin/persons/users/:id",
      name: "Current User Profile",
      internal: true,
      component: AdminPersonUserProfile
    },
    {
      path: "/admin/persons/agencies/:id",
      name: "Current Admin Agency Profile",
      internal: true,
      component: AdminPersonAgencyProfile
    },
    {
      path: "/admin/persons/organisations/:id",
      name: "Current Admin Organisation Profile",
      internal: true,
      component: AdminPersonOrgsProfile
    },
    {
      path: "/admin/persons/departments/:id",
      name: "Current Admin Department Profile",
      internal: true,
      component: AdminPersonDepartmentProfile
    },
    {
      path: "/admin/persons/admins/:id",
      name: "Current Admin Profile",
      internal: true,
      component: AdminPersonAdminProfile
    },
  ]
};

const uploadRoutes = {
  id: "Upload",
  path: "/organisations/jobUpload",
  component: JobUpload,
  children: null
};

const updateRoutes = {
  id: "Update",
  path: "/organisations/jobUpdate/:id",
  component: JobUpdate,
  children: null
};

const calendarRoutes = {
  id: "Deinst Kalendar",
  path: "/organisations/calendar",
  component: OrganisationCalendar,
  leftBar: true,
  children: null
};

const openLayoutsRoutes = {
  id: "Bestatigung",
  path: "/organisations/openLayouts",
  component: OpenLayouts,
  leftBar: true,
  children: null
};

const externalLayoutsRoutes = {
  id: "Externe Anfragen",
  path: "/organisations/externalLayouts",
  component: ExternalLayouts,
  leftBar: true,
  children: null
};

const allApplicantsRoutes = {
  id: "Offene Schichten",
  path: "/organisations/allApplicants",
  component: AllApplicants,
  leftBar: true,
  children: null
};

const orgsDashboardRoutes = {
  id: "OrgsDashboard",
  path: "/organisations/dashboard",
  component: OrgsDashboard,
  leftBar: true,
  children: null
};









const dashboardsRoutes = {
  id: "Dashboard",
  path: "/other/dashboard",
  header: "Main",
  icon: <Sliders />,
  // containsHome: true,
  children: [
    {
      path: "/other",
      name: "Default",
      component: Default
    },
    {
      path: "/other/dashboard/analytics",
      name: "Analytics",
      component: Analytics
    }
  ]
};

const pagesRoutes = {
  id: "Pages",
  path: "/other/pages",
  icon: <Layout />,
  children: [
    {
      path: "/other/pages/profile",
      name: "Profile",
      component: Profile
    },
    {
      path: "/other/pages/settings",
      name: "Settings",
      component: Settings
    },
    {
      path: "/other/pages/projects",
      name: "Projects",
      component: Projects,
      badge: "New"
    },
    {
      path: "/other/pages/invoice",
      name: "Invoice",
      component: Invoice
    },
    {
      path: "/other/pages/pricing",
      name: "Pricing",
      component: Pricing
    },
    {
      path: "/other/pages/tasks",
      name: "Tasks",
      component: Tasks,
      badge: "New"
    },
    {
      path: "/other/pages/blank",
      name: "Blank Page",
      component: Blank
    }
  ]
};

const authRoutes = {
  id: "Auth",
  path: "/auth",
  icon: <Users />,
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500
    }
  ]
};

const documentationRoutes = {
  id: "Documentation",
  path: "/other/documentation",
  icon: <BookOpen />,
  component: Docs,
  children: null
};

const componentsRoutes = {
  id: "Components",
  path: "/other/components",
  header: "Elements",
  icon: <Grid />,
  children: [
    {
      path: "/other/components/avatars",
      name: "Avatars",
      component: Avatars
    },
    {
      path: "/other/components/badges",
      name: "Badges",
      component: Badges
    },
    {
      path: "/other/components/buttons",
      name: "Buttons",
      component: Buttons
    },
    {
      path: "/other/components/cards",
      name: "Cards",
      component: Cards
    },
    {
      path: "/other/components/chips",
      name: "Chips",
      component: Chips
    },
    {
      path: "/other/components/dialogs",
      name: "Dialogs",
      component: Dialogs
    },
    {
      path: "/other/components/expansion-panels",
      name: "Expansion Panels",
      component: ExpPanels
    },
    {
      path: "/other/components/lists",
      name: "Lists",
      component: Lists
    },
    {
      path: "/other/components/menus",
      name: "Menus",
      component: Menus
    },
    {
      path: "/other/components/progress",
      name: "Progress",
      component: Progress
    },
    {
      path: "/other/components/snackbars",
      name: "Snackbars",
      component: Snackbars
    },
    {
      path: "/other/components/tooltips",
      name: "Tooltips",
      component: Tooltips
    }
  ]
};

const formsRoutes = {
  id: "Forms",
  path: "/other/forms",
  icon: <CheckSquare />,
  children: [
    {
      path: "/other/forms/pickers",
      name: "Pickers",
      component: Pickers
    },
    {
      path: "/other/forms/selection-controls",
      name: "Selection Controls",
      component: SelectionCtrls
    },
    {
      path: "/other/forms/selects",
      name: "Selects",
      component: Selects
    },
    {
      path: "/other/forms/text-fields",
      name: "Text Fields",
      component: TextFields
    }
  ]
};

const tablesRoutes = {
  id: "Tables",
  path: "/other/tables",
  icon: <List />,
  children: [
    {
      path: "/other/tables/simple-table",
      name: "Simple Table",
      component: SimpleTable
    },
    {
      path: "/other/tables/advanced-table",
      name: "Advanced Table",
      component: AdvancedTable
    }
  ]
};

const iconsRoutes = {
  id: "Icons",
  path: "/other/icons",
  icon: <Heart />,
  children: [
    {
      path: "/other/icons/material-icons",
      name: "Material Icons",
      component: MaterialIcons
    },
    {
      path: "/other/icons/feather-icons",
      name: "Feather Icons",
      component: FeatherIcons
    }
  ]
};

const chartRoutes = {
  id: "Charts",
  path: "/other/charts",
  icon: <PieChart />,
  component: Chartjs,
  children: null
};

const mapsRoutes = {
  id: "Maps",
  path: "/other/maps",
  icon: <Map />,
  children: [
    {
      path: "/other/maps/google-maps",
      name: "Google Maps",
      component: GoogleMaps
    },
    {
      path: "/other/maps/vector-maps",
      name: "Vector Maps",
      component: VectorMaps
    }
  ]
};

// This route is not visisble in the sidebar
const privateRoutes = {
  id: "Private",
  path: "/other/private",
  component: Blank,
  children: null
};


export const adminPannel = [
  dashboardAdminRoutes,
  agenciesAdminRoutes,
  orgsAdminRoutes,
  personsAdminRoutes
];

export const organisations = [
  uploadRoutes,
  updateRoutes
];

export const organisationsJobs = [
  calendarRoutes,
  externalLayoutsRoutes,
  openLayoutsRoutes,
  allApplicantsRoutes,
  orgsDashboardRoutes,
];




export const dashboard = [
  dashboardsRoutes,
  pagesRoutes,
  documentationRoutes,
  componentsRoutes,
  chartRoutes,
  formsRoutes,
  tablesRoutes,
  iconsRoutes,
  mapsRoutes,
  privateRoutes
];

export const auth = [authRoutes];

export default [
  dashboardsRoutes,
  pagesRoutes,
  authRoutes,
  documentationRoutes,
  componentsRoutes,
  chartRoutes,
  formsRoutes,
  tablesRoutes,
  iconsRoutes,
  mapsRoutes
];
