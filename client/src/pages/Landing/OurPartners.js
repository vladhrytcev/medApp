import React from "react";
import { useTranslation } from 'react-i18next';
import Grid from "@material-ui/core/Grid";

import {
    OurPartnersIcon,
    TypographyHeader
} from './styledComponent.js';
import { FieldsWrapper } from '../globalLandingStyles.js';


function OurPartners() {
    const { t, i18n } = useTranslation();

    return (
      <div>
        <FieldsWrapper>
            <TypographyHeader variant="h4" gutterBottom>OUR PARTNERS</TypographyHeader>
            <Grid container justify="space-between" alignItems="center">
                {[1,2,3,4,5,6,7,8].map(item =>
                    <Grid key={item} item xs={12} sm={6} md={4} xl='auto'>
                        <OurPartnersIcon>
                            <img src={`/static/img/icons/ourPartnersIcon${item}.png`} />
                        </OurPartnersIcon>
                    </Grid>
                )}
            </Grid>
        </FieldsWrapper>
      </div>
    );
}
  
  
  export default OurPartners;