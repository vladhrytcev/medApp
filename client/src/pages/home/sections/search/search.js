import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { Section, SectionContainer } from '../../layouts';
import { IntroImage, SearchForm } from '../../components';
import { SearchContainer } from './search.style';

export const Search = ({ sectionHead, specialitiesList, sectionBgColor, id, sendForm }) => {
  const TRANSLATION_PATH = `${sectionHead}.search`;
  const { t } = useTranslation();
  const imageData = t(`${TRANSLATION_PATH}.intro-image`, { returnObjects: true });

  return (
    <Section bgColor={sectionBgColor} id={id}>
      <SectionContainer>
        <SearchContainer>
          <IntroImage srcImg={imageData.src} width='1376' height='536' alt={imageData.alt} />
          <SearchForm classes={classNames('search-form')} specialitiesList={specialitiesList} searchHead={TRANSLATION_PATH} sendForm={sendForm} />
        </SearchContainer>
      </SectionContainer>
    </Section>
  );
}
