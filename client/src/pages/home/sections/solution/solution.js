import React from 'react';
import { useTranslation } from 'react-i18next';

import { Section, SectionContainer } from '../../layouts';
import { SolutionContainer } from './solution.style';
import { Presenter } from '../../components';

export const Solution = ({ sectionBgColor, sectionHead }) => {
  const TRANSLATION_PATH = `${sectionHead}.solution`;
  const { t } = useTranslation();
  const solutions = t(`${TRANSLATION_PATH}.list`, { returnObjects: true });
  const title = t(`${TRANSLATION_PATH}.title`);

  return (
    <Section bgColor={sectionBgColor}>
      <SectionContainer>
        <SolutionContainer>
          <Presenter list={solutions} title={title} imageWidth={480} />
        </SolutionContainer>
      </SectionContainer>
    </Section>
  );
};
