import React from 'react';
import { useTranslation } from 'react-i18next';

import { Main } from '../../layouts';
import { PageTitle, HelmetComponent } from '../../components';
import {
  Staff,
  Challenge,
  Solution,
  Outcome,
  ContactUs,
  HowItWorks
} from '../../sections';

export const Innovation = () => {
  const { t } = useTranslation();
  const sectionHead = 'innovation';
  const sectionHead2= 'innovation.secondary';

  return (
    <>
    <HelmetComponent sectionHead={sectionHead} />
    <Main>
      <PageTitle sectionHead={sectionHead} />
      <Staff sectionHead={sectionHead} />
	  <Outcome sectionHead={sectionHead} />
      <HowItWorks sectionBgColor="#ffffff" sectionHead={sectionHead} />
	  <Outcome sectionHead={sectionHead2} />
      <ContactUs sectionBgColor="#ffffff" sectionHead={sectionHead} />
    </Main>
    </>
  );
};
