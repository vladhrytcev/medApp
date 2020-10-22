import React from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';

import { SectionContainer, Section } from '../../layouts';
import {
  OurPartnersContainer,
  OurPartnersIcon,
  TypographyHeader,
  MobileContainer,
  DesktopGrid,
  MobileGrid
} from './our-partners.style';

export const OurPartners = ({ sectionBgColor, sectionHead }) => {
  const TRANSLATE_PATH = `${sectionHead}.our-partners`;
  const { t } = useTranslation();
  const partnersList = t(`${TRANSLATE_PATH}.list`, { returnObjects: true });

  return (
    <Section bgColor={sectionBgColor} >
      <SectionContainer>
        <OurPartnersContainer>
          <TypographyHeader>
            {t(`${TRANSLATE_PATH}.title`)}
          </TypographyHeader>
          <DesktopGrid
            container
            justify="space-around"
            alignItems="center"
          >
            {partnersList.map(({ _id, imgSrc, imgAlt }) =>
              <Grid key={_id} item sm={1} md={1} lg={1} xl={1}>
                <OurPartnersIcon>
                  <img src={imgSrc} alt={imgAlt} />
                </OurPartnersIcon>
              </Grid>
            )}
          </DesktopGrid>
          <MobileGrid
            container
            justify="space-between"
            alignItems="center"
          >
            {partnersList.map(({ _id, imgSrc, imgAlt }, index) =>
              <Grid key={_id} item xs={(index > 4) ? 2 : 3}>
                <OurPartnersIcon>
                  <img src={imgSrc} alt={imgAlt} />
                </OurPartnersIcon>
              </Grid>
            )}
          </MobileGrid>
        </OurPartnersContainer>
      </SectionContainer>
    </Section>
  )
}
