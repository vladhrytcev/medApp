import React from "react";
import { object } from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import { connect } from 'react-redux';

import {
    FooterWrapper,
    FooterColumnItem,
    TypographyColumnItemHeader,
    FooterItemDivider,
    FooterItemInfo,
    NavLink,
    HiddenFooterItemDivider,
    HiddenTypographyColumnItemHeader,
    FooterSocialField,
    FooterSocialIcon,
    FooterSocialGrid,
    FooterPartnerItem,
} from './styledComponent.js';
import { FieldsWrapper } from '../globalLandingStyles.js';


const propTypes = {
    local: object
};


function LandingFooter({ local }) {
    const { t, i18n } = useTranslation();

    return (
      <FooterWrapper>
        <FieldsWrapper>
            <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12} sm={6} md={3}>
                    <FooterColumnItem>
                        <TypographyColumnItemHeader variant="h6" gutterBottom>{t('global.qlinks')}</TypographyColumnItemHeader>
                        <FooterItemDivider />
                        <FooterItemInfo>
                            <li>
                                <Typography variant="h6">
                                    <NavLink data='footer-link' to={`/${local.language}`}>{t('global.Clinics')}</NavLink>
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="h6">
                                    <NavLink data='footer-link' to={`/${local.language}/agencies`}>{t('global.Agencies')}</NavLink>
                                </Typography>
                            </li>
                        </FooterItemInfo>
                    </FooterColumnItem>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <FooterColumnItem>
                        <TypographyColumnItemHeader variant="h6" gutterBottom>{t('global.contact_us')}</TypographyColumnItemHeader>
                        <FooterItemDivider />
                        <FooterItemInfo>
                            <li>
                                <Typography variant="h6">
                                    <NavLink data='footer-link' to={`/${local.language}`}>{t('global.phone')}</NavLink>
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="h6">
                                    <NavLink data='footer-link' to={`/${local.language}`}>{t('global.email')}</NavLink>
                                </Typography>
                            </li>
                        </FooterItemInfo>
                    </FooterColumnItem>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <FooterColumnItem>
                        <TypographyColumnItemHeader variant="h6" gutterBottom>{t('global.other')}</TypographyColumnItemHeader>
                        <FooterItemDivider />
                        <FooterItemInfo>
                            <li>
                                <Typography variant="h6">
                                    <NavLink data='footer-link' to={`/${local.language}`}>{t('global.uber_uns')}</NavLink>
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="h6">
                                    <NavLink data='footer-link' to={`/${local.language}`}>{t('global.AGB')}</NavLink>
                                </Typography>
                            </li>
                        </FooterItemInfo>
                    </FooterColumnItem>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <FooterColumnItem>
                        <HiddenTypographyColumnItemHeader variant="h6" gutterBottom>hidden</HiddenTypographyColumnItemHeader>
                        <HiddenFooterItemDivider />
                        <FooterItemInfo>
                            <li>
                                <Typography variant="h6">
                                    <NavLink data='footer-link' to={`/${local.language}`}>{t('global.Data_security')}</NavLink>
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="h6">
                                    <NavLink data='footer-link' to={`/${local.language}`}>{t('global.Impressum')}</NavLink>
                                </Typography>
                            </li>
                        </FooterItemInfo>
                    </FooterColumnItem>
                </Grid>
            </Grid>
            <FooterSocialField>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">
                            &copy;MedLink Copyright 2019. All rights reserved.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FooterSocialGrid container alignItems="center">
                            <Grid item>
                                <a href='#'>
                                    <FooterSocialIcon src='/static/img/icons/facebookIcon.png' />
                                </a>
                            </Grid>
                            <Grid item>
                                <a href='#'>
                                    <FooterSocialIcon src='/static/img/icons/twitterIcon.png' />
                                </a>
                            </Grid>
                            <Grid item>
                                <a href='#'>
                                    <FooterSocialIcon src='/static/img/icons/linkedinIcon.png' />
                                </a>
                            </Grid>
                        </FooterSocialGrid>
                    </Grid>
                </Grid>
            </FooterSocialField>
            <Grid container justify="space-between" alignItems="center">
                {[1,2,3,4,5,6].map(item => 
                    <Grid key={item} item xs={12} sm={6} md={4} lg={2}>
                        <FooterPartnerItem>
                            <img src={`/static/img/icons/footerPartnersIcon${item}.png`} />
                        </FooterPartnerItem>
                    </Grid>
                )}
            </Grid>
        </FieldsWrapper>
      </FooterWrapper>
    );
}

LandingFooter.propTypes = propTypes;

const mapStateToProps = (state) =>({
    local : state.local,
});
  
  
export default connect(mapStateToProps)(LandingFooter);