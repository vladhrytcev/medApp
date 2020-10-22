import React from 'react';
import { Section, SectionContainer } from '../../layouts';
import { AdvantagesContainer, AdvantagesList, AdvantagesItem, advantagesStyles } from './advantages.style';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export const Advantages = ({ sectionBgColor, sectionHead }) => {
  const TRANSLATION_PATH = `${sectionHead}.advantages`;
  const classes = advantagesStyles();
  const { t } = useTranslation();
  const list = t(`${TRANSLATION_PATH}.list`, { returnObjects: true });

  return (
    <Section bgColor={sectionBgColor}>
      <SectionContainer>
        <AdvantagesContainer>
          <Typography variant="h2" className={classes.title}>
            {t(`${TRANSLATION_PATH}.title`)}
          </Typography>
          <AdvantagesList>
            {
              list.map(({ _id, title, text, image }) => (
                <AdvantagesItem key={_id} >
                  <img className={classes.itemImage} src={image.src} height='108' alt={image.alt} />
                  <div className={classes.itemTextBlock}>
                    <Typography className={classes.itemTitle} variant='h4' component='h3'>
                      {title}
                    </Typography>
                    <Typography className={classes.itemText}>
                      {text}
                    </Typography>
                  </div>
                </AdvantagesItem>
              ))
            }
          </AdvantagesList>
        </AdvantagesContainer>
      </SectionContainer>
    </Section>
  );
};
