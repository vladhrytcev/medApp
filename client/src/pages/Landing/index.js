import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBarMenu from './NavBarMenu';
import HeaderCarousel from './HeaderCarousel';
import AdvantagesField from './AdvantagesField';
import ReviewCarousel from './ReviewCarousel';
import OurPartners from './OurPartners';
import ContactField from './ContactField';
import LandingFooter from './LandingFooter';


function LandingPage() {
  return (
    <div>
      <CssBaseline />
      <NavBarMenu />
      <HeaderCarousel />
      <AdvantagesField />
      <ReviewCarousel />
      <OurPartners />
      <ContactField
			type='clinics'
		/>
      <LandingFooter />
    </div>
  );
}


export default LandingPage;