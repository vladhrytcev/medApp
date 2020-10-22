import React from 'react';
import { useTranslation } from 'react-i18next';
import { HowItWorksWrapper, HowItWorksStyles } from './how-it-work.style';
import Typography from '@material-ui/core/Typography';
import { Section, SectionContainer } from '../../layouts';
import { Presenter } from '../../components';

export const HowItWorks = ({ sectionBgColor, sectionHead }) => {
  const TRANSLATION_PATH = `${sectionHead}.how-it-work`;
  const { t } = useTranslation();
  const classes = HowItWorksStyles();
  const list = t(`${TRANSLATION_PATH}.list`, { returnObjects: true });

  return (
    <Section bgColor={sectionBgColor}>
      <SectionContainer>
        <HowItWorksWrapper>
          <Typography className={classes.title} variant='h2'>
            {t(`${TRANSLATION_PATH}.title`)}
          </Typography>
          <Typography className={classes.subtitle}>
            {t(`${TRANSLATION_PATH}.subtitle`)}
          </Typography>
          <Presenter list={list} imageWidth={544} sectionHead={sectionHead} />
        </HowItWorksWrapper>
      </SectionContainer>
    </Section>
  )
}
