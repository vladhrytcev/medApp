import React from 'react';
import { Section, SectionContainer } from '../../layouts';
import { OutcomeContainer, OutcomeList, OutcomeItem, outcomeStyles } from './outcome.style';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export const Outcome = ({ sectionBgColor, sectionHead }) => {
  const TRANSLATE_PATH = `${sectionHead}.outcome`;
  const classes = outcomeStyles();
  const { t } = useTranslation();
  const list = t(`${TRANSLATE_PATH}.list`, { returnObjects: true });

  return (
    <Section bgColor={sectionBgColor}>
      <SectionContainer>
        <OutcomeContainer>
          <Typography className={classes.title} variant='h2'>
            {t(`${TRANSLATE_PATH}.title`)}
          </Typography>
          <Typography className={classes.subtitle}>
            {t(`${TRANSLATE_PATH}.subtitle`)}
          </Typography>
          <OutcomeList>
            {
				list.length > 0 &&
				  list.map(({ _id, title, subtitle, image }) => (
					<OutcomeItem key={_id}>
					  <img className={classes.itemImage} src={image.src} width='88' height='100' alt={image.alt} />
					  <Typography className={classes.itemTitle} variant='h3'>
						{title}
					  </Typography>
					  <Typography className={classes.itemSubtitle}>
						{subtitle}
					  </Typography>
					</OutcomeItem>
				  ))
            }
          </OutcomeList>
        </OutcomeContainer>
      </SectionContainer>
    </Section>
  );
};
