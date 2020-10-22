import React from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from '@material-ui/core';

import { Section, SectionContainer } from '../../layouts';
import { StaffContainer, staffStyles } from './staff.style';

export const Staff = ({ sectionBgColor, sectionHead }) => {
  const TRANSLATE_PATH = `${sectionHead}.staff`;
  const { t } = useTranslation();
  const image = t(`${TRANSLATE_PATH}.image`, { returnObjects: true });
  const mobileImage = t(`${TRANSLATE_PATH}.image-mobile`, { returnObjects: true });
  const tabletImage = t(`${TRANSLATE_PATH}.image-tablet`, { returnObjects: true });
  const classes = staffStyles();
  const paragraphs = t(`${TRANSLATE_PATH}.text`, { returnObjects: true });

  return (
    <Section sectionBgColor={sectionBgColor}>
      <SectionContainer>
        <StaffContainer>
          <div className="staff__image">
            <img src={image.src} width='544' height='544' alt={image.alt} />
          </div>
          <div className="staff__image-mobile">
            <img src={mobileImage.src} width='288' height='288' alt={mobileImage.alt} />
          </div>
          <div className="staff__image-tablet">
            <img src={tabletImage.src} width='288' height='288' alt={tabletImage.alt} />
          </div>
          <div className="staff__text">
            <Typography variant='h2' className={classes.title}>
              {t(`${TRANSLATE_PATH}.title`)}
            </Typography>
            {
              React.Children.map(paragraphs, p => (
                <Typography className={classes.text}>
                  {p}
                </Typography>
              ))
            }
          </div>
        </StaffContainer>
      </SectionContainer>
    </Section>
  );
};
