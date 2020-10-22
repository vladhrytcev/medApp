import React from 'react';
import { useTranslation } from 'react-i18next';

import { Main, Section, SectionContainer } from '../../layouts';
import { PageTitle, IntroImage, HelmetComponent } from '../../components';
import { OurNetwork, HowItWorks, Advantages, ContactUs } from '../../sections';

export const Partners = () => {
  const { t } = useTranslation();
  const sectionHead = 'partners';
  const imageData = t(`${sectionHead}.intro-image`, { returnObjects: true });

  return (
    <>
    <HelmetComponent sectionHead={sectionHead} />
    <Main>
	{/*<PageTitle>
        {t(`${sectionHead}.title`)}
      </PageTitle>
      <Section>
        <SectionContainer>
          <IntroImage srcImg={imageData.src} width='1376' height='536' alt={imageData.alt} />
        </SectionContainer>
	</Section>*/}
      <OurNetwork sectionHead={sectionHead} />
      <HowItWorks sectionBgColor='#ffffff' sectionHead={sectionHead} />
      <Advantages sectionHead={sectionHead} />
      <ContactUs sectionHead={sectionHead} />
    </Main>
    </>
  );
};
