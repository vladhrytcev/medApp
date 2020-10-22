import React from 'react';
import { Section, SectionContainer } from '../../layouts';
import { ChallengeContainer, ChallengeList, ChallengeItem, challengeStyles } from './challenge.style';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export const Challenge = ({ sectionBgColor, sectionHead }) => {
  const TRANSLATION_PATH = `${sectionHead}.challenge`;
  const { t } = useTranslation();
  const classes = challengeStyles();
  const challenges = t(`${TRANSLATION_PATH}.list`, { returnObjects: true });

  return (
    <Section bgColor={sectionBgColor}>
      <SectionContainer>
        <ChallengeContainer>
          <Typography variant='h2' className={classes.title}>
            {t(`${TRANSLATION_PATH}.title`)}
          </Typography>
          <ChallengeList>
            {
              challenges.map(({ _id, title, image }) => (
                <ChallengeItem key={_id}>
                  <img className={classes.challengeItemImage} src={image.src} width='208' height='208' alt={image.alt} />
                  <Typography variant='h4' component='h3' className={classes.challengeItemTitle}>
                    {title}
                  </Typography>
                </ChallengeItem>
              ))
            }
          </ChallengeList>
        </ChallengeContainer>
      </SectionContainer>
    </Section>
  );
};
