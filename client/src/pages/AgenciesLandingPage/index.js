import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBarMenu from '../Landing/NavBarMenu';
import HeaderCarousel from './HeaderCarousel';
import AdvantagesField from './AdvantagesField';
import HumanResource from './HumanResource';
import OurPartners from '../Landing/OurPartners';
import ContactField from '../Landing/ContactField';
import LandingFooter from '../Landing/LandingFooter';

function AgenciesLandingPage() {
  return (
    <div>
      <CssBaseline />
      <NavBarMenu />
      <HeaderCarousel />
      <AdvantagesField />
      <HumanResource />
      <OurPartners />
      <ContactField
			type='agencies'
		/>
      <LandingFooter />
    </div>
  );
}


export default AgenciesLandingPage;