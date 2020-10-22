import React from 'react';
import { useTranslation } from 'react-i18next';

import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { Section, SectionContainer } from '../../layouts';
import { OurNetworkContainer, OurNetworkTextContainer, ourNetworkStyles, OurNetworkImageContainer } from './our-network.style';

export const OurNetwork = ({ sectionBgColor, sectionHead }) => {
  const TRANSLATE_PATH = `${sectionHead}.our-network`;
  const classes = ourNetworkStyles();
  const { t } = useTranslation();
  const list = t(`${TRANSLATE_PATH}.list`, { returnObjects: true });
  const imageData = t(`${TRANSLATE_PATH}.image`, { returnObjects: true });

  return (
    <Section bgColor={sectionBgColor}>
      <SectionContainer>
        <OurNetworkContainer>
          <OurNetworkTextContainer>
            <Typography variant='h2' className={classes.title}>
              {t(`${TRANSLATE_PATH}.title`)}
            </Typography>
            <Typography className={classes.text}>
              {t(`${TRANSLATE_PATH}.text`)}
            </Typography>
            <List className={classes.listItem}>
              {list.map(({ _id, title }, index) => {
                return (
                  <ListItem key={_id} className={classes.listView}>
                    {title}
                  </ListItem>
                );
              })}
            </List>
          </OurNetworkTextContainer>
          <OurNetworkImageContainer>
            <img src={imageData.src} alt={imageData.alt} />
          </OurNetworkImageContainer>
        </OurNetworkContainer>
      </SectionContainer>
    </Section>
  );
};
