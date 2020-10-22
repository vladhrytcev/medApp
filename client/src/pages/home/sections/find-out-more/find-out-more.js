import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { useLocation } from 'react-router-dom';

import { Button } from '../../../../components/common/button';
import { Section, SectionContainer } from '../../layouts';
import { FindOutMoreContainer, findOutMoreStyles } from './find-out-more.style';
import { HashLink as HLink } from 'react-router-hash-link';

export const FindOutMore = ({ sectionBgColor, sectionHead }) => {
  const TRANSLATION_PATH = `${sectionHead}.find-out-more`;
  const { t } = useTranslation();
  const image = t(`${TRANSLATION_PATH}.image`, { returnObjects: true });
  const classes = findOutMoreStyles();
  let location = useLocation();

  return (
    <Section bgColor={sectionBgColor}>
      <SectionContainer>
        <FindOutMoreContainer>
          <div className="find-out-more__image">
            <img src={image.src} width='544' height='544' alt={image.alt} />
          </div>
          <div className="find-out-more__text">
            <Typography variant="h2" className={classes.title}>
              {t(`${TRANSLATION_PATH}.title`)}
            </Typography>
            <Typography className={classes.text}>
              {t(`${TRANSLATION_PATH}.text`)}
            </Typography>
            <Button label={t(`${TRANSLATION_PATH}.button-text`)} size="large" href={`${location.pathname}#search_form`}/>
          </div>
        </FindOutMoreContainer>
      </SectionContainer>
    </Section>
  )
}
