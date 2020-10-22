import React from 'react';
import { Section, SectionContainer } from '../../layouts';
import { OurPromiseContainer, PromiseRow, ourPromiseStyles } from './our-promise.style';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export const OurPromise = ({ sectionBgColor, sectionHead, width, breakpoints }) => {
  const TRANSLATION_PATH = `${sectionHead}.our-promise`;
  const classes = ourPromiseStyles();
  const { t } = useTranslation();
  const promises = t(`${TRANSLATION_PATH}.list`, { returnObjects: true });

  function getMainImage(width, image) {
    if (width < breakpoints.sm) {
      return (<img src={image['src-mobile']} width='544' height='360' alt={image.alt} />)
    }
    return (<img src={image.src} width='544' height='360' alt={image.alt} />)
  }

  return (
    <Section bgColor={sectionBgColor}>
      <SectionContainer>
        <OurPromiseContainer>
		{/*<Typography className={classes.title} variant='h2'>
            {t(`${TRANSLATION_PATH}.title`)}
          </Typography>
          <Typography className={classes.subtitle} component="h3">
            {t(`${TRANSLATION_PATH}.subtitle`)}
		</Typography>*/}
          {
            promises.map(({ _id, title, text, image, icon }, index) => {
              const revertClass = (index % 2 === 1) ? "revert" : ""
              return (
                <PromiseRow className={revertClass} key={_id}>
                  <div className='promise__main-img'>
                    {getMainImage(width, image)}
                  </div>
                  <div className='promise__text'>
                    <img src={icon.src} height='50' alt={icon.alt} />
                    <Typography className={classes.itemTitle} variant='h3'>
                      {title}
                    </Typography>
                    <Typography className={classes.itemText}>
                      {text}
                    </Typography>
                  </div>
                </PromiseRow>
              );
            })
          }
        </OurPromiseContainer>
      </SectionContainer>
    </Section>
  );
};
