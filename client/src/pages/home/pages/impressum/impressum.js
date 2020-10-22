import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Typography } from '@material-ui/core';
import { impressumStyles } from './impressum.style';
import classNames from 'classnames';

import { Main, Section, SectionContainer } from '../../layouts';
import { PageTitle, IntroImage, HelmetComponent } from '../../components';
import { OurNetwork, HowItWorks, Advantages, ContactUs } from '../../sections';

export const Impressum = () => {
  const classes = impressumStyles();
  const TRANSLATE_PATH = 'impressum';
  const { t } = useTranslation();
  const list = t(`${TRANSLATE_PATH}.list`, { returnObjects: true});
  const details = t(`${TRANSLATE_PATH}.details`, { returnObjects: true});
  
  return (
		<>
			<HelmetComponent sectionHead={TRANSLATE_PATH} />
			<Main>
			  <PageTitle sectionHead={TRANSLATE_PATH} />
			  <Section className={classes.main}>
				<p>{t(`${TRANSLATE_PATH}.date`)}</p>
				<div className={classes.olTop}>
					{list.map(({ _id, text, href, dblink}, index) => {
						if(dblink != undefined) {
							text = text + t(dblink);
						}
						return (
							<Trans defaults={text} parent='p' key={_id} className={classes.text}>
								<br /><strong></strong><a href={href}></a>
							</Trans>
						)
					})}
					{details.map(({ _id, title, text}, index) => {
						return (
							<div key={_id}>
								<h3 className={classes.topList}>{title}</h3>
								<p className={classes.text}>{text}</p>
							</div>
						)
					})}
				</div>
				<h3 className={classes.topList}>{t(`${TRANSLATE_PATH}.end`)}</h3>
			  </Section>
			</Main>
		</>
  );
};
