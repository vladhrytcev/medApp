import React from 'react';
import { useTranslation, Trans, getI18n } from 'react-i18next';

import { Main } from '../../layouts';
import { PageTitle, SearchForm, HelmetComponent } from '../../components';
import {
  Search,
  OurPartners,
  Platform,
  Features,
  HowItWorks,
  Feedbacks,
  FindOutMore,
  ContactUs
} from '../../sections';

export const Medlink = ({ specialities, sendForm }) => {
  const { t } = useTranslation();
  const sectionHead = 'home.landing';
  const lng = t('global.lng');

  const jobt = {};
  if (Object.keys(specialities).length > 0 ){
	  for (let key in specialities){
		  const fld = specialities[key].fields.map((index) => {
			 return index.value[lng];
		  });
		  jobt[specialities[key].value[lng]] = {fields: fld, qual: specialities[key].qualification};
	  }
  }
  
  return (
    <>
      <HelmetComponent sectionHead={sectionHead} />
      <Main>
        <PageTitle sectionHead={sectionHead} id='search_form' />
        <Search sectionHead={sectionHead} specialitiesList={jobt} sendForm={sendForm} />
        <OurPartners sectionHead={sectionHead} />
        <Platform sectionHead={sectionHead} />
        <Features sectionBgColor='#ffffff' sectionHead={sectionHead} />
        <HowItWorks sectionHead={sectionHead} />
        <Feedbacks sectionBgColor='#ffffff' sectionHead={sectionHead} />
        <FindOutMore sectionHead={sectionHead} />
        <ContactUs sectionHead={sectionHead} />
      </Main>
    </>
  )
};
