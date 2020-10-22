import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import Typography from '@material-ui/core/Typography';

import { Section, SectionContainer } from '../../layouts';
import { FeatureContainer, FeatureList, FeatureItem, featureStyles } from './features.style';

export const Features = ({ sectionBgColor, sectionHead }) => {
  const TRANSLATION_PATH = `${sectionHead}.features`;
  const { t } = useTranslation();
  const features = t(`${TRANSLATION_PATH}.list`, { returnObjects: true });
  const classes = featureStyles();

  return (
    <Section bgColor={sectionBgColor}>
      <SectionContainer>
        <FeatureContainer>
          <Typography variant='h2' className={classes.featureTitle}>
            {t(`${TRANSLATION_PATH}.title`)}
          </Typography>
          <FeatureList>
            {
              features.map(({ _id, title, text, image }) => (
                <FeatureItem key={_id}>
                  <div className="image-container">
                    <img src={image.src} className={classes.featureItemImg} height='105' alt={image.alt} />
                  </div>
                  <div className="content-container">
                    <Trans parent={Typography} variant='h4' component='h3' className={classes.featureItemTitle} defaults={title}>
                      <br />
                    </Trans>
                    <Typography className={classes.featureItemText}>
                      {text}
                    </Typography>
                  </div>
                </FeatureItem>
              ))
            }
          </FeatureList>
        </FeatureContainer>
      </SectionContainer>
    </Section>
  )
}