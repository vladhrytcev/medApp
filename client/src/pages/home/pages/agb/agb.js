import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Typography } from '@material-ui/core';
import { agbStyles } from './agb.style';
import classNames from 'classnames';

import { Main, Section, SectionContainer } from '../../layouts';
import { PageTitle, IntroImage, HelmetComponent } from '../../components';
import { OurNetwork, HowItWorks, Advantages, ContactUs } from '../../sections';

export const AGB = () => {
  const classes = agbStyles();
  const TRANSLATE_PATH = 'agb';
  const { t } = useTranslation();
  const list = t(`${TRANSLATE_PATH}.list`, { returnObjects: true});

  return (
		<>
		<HelmetComponent sectionHead={TRANSLATE_PATH} />
    <Main>
	  <PageTitle sectionHead={TRANSLATE_PATH} />
      <Section className={classes.main}>
	    <p>{t(`${TRANSLATE_PATH}.date`)}</p>
		<ol className={classes.olTop}>
			{list.map(({ _id, title, text, sublist}, index) => {
				return (
					<li key={_id} className={classes.topList}>
						{title}
						{text != "" &&
							<p className={classes.text}>{text}</p>
						}
						{sublist.length > 0 &&
							<ol className={classes.ol}>
								{sublist.map(({ _id, text, href }) => {
									return (
										<li key={_id} className={classes.text}>
											<Trans defaults={text} >
												<br /><strong></strong><a href={href}></a>
											</Trans>
										</li>
									);
								})}
							</ol>
						}
					</li>
				);
			})}
		</ol>
	  </Section>
		</Main>
		</>
  );
};
