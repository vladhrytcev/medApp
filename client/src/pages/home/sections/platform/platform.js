import React from 'react';
import { useTranslation } from 'react-i18next';
import classname from 'classnames';

import Typography from '@material-ui/core/Typography';

import { SectionContainer, Section } from '../../layouts';
import { PlatformContainer, platformStyles } from './platform.style';

export const Platform = ({ sectionBgColor, sectionHead }) => {
  const TRANSLATION_PATH = `${sectionHead}.platform`;
  const { t } = useTranslation();
  const classes = platformStyles();
  const imageData = t(`${TRANSLATION_PATH}.image`, { returnObjects: true })
  const paragraphs = t(`${TRANSLATION_PATH}.text`, { returnObjects: true });

  return (
    <Section bgColor={sectionBgColor}>
      <SectionContainer>
        <PlatformContainer>
          <div className='platform-image'>
            <img src={imageData.src} alt={imageData.alt} className={classes.platformImage} />
          </div>
          <div className='platform-text'>
            <Typography variant='h2' className={classes.platformTitle}>
              {t(`${TRANSLATION_PATH}.title`)}
            </Typography>
            <Typography variant='h3' className={classname({
              [classes.platformTitle]: true,
              [classes.platformSubtitle]: true
            })}>
              {t(`${TRANSLATION_PATH}.subtitle`)}
            </Typography>
            {
              React.Children.map(paragraphs, p => (
                <Typography className={classes.platformText}>
                  {p}
                </Typography>
              ))
            }
          </div>
        </PlatformContainer>
      </SectionContainer>
    </Section>
  )
}
