import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBarMenu from '../Landing/NavBarMenu';
import HeaderCarousel from './HeaderCarousel';
import AdvantagesField from './AdvantagesField';
import HowItWorks from './HowItWorks';
import ReviewCarousel from './ReviewCarousel';
import OurPartners from '../Landing/OurPartners';
import ContactField from '../Landing/ContactField';
import LandingFooter from '../Landing/LandingFooter';


function HowItWorksLandingPage() {
  return (
    <div>
      <CssBaseline />
      <NavBarMenu />
      <HeaderCarousel />
      <HowItWorks />
      <AdvantagesField />
      <ReviewCarousel />
      <OurPartners />
      <ContactField 
		type='general'
	  />
      <LandingFooter />
    </div>
  );
}


export default HowItWorksLandingPage;