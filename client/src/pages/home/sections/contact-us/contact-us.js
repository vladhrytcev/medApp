import React from 'react';
import { ContentContainer } from './contact-us.style';
import { Intro, Details } from './components';
import { Section, SectionContainer } from '../../layouts';

export const ContactUs = ({ sectionBgColor, sectionHead }) => {
  const TRANSLATION_PATH = `${sectionHead}.contact-us-intro`;

  return (
    <Section bgColor={sectionBgColor} id='contact'>
      <SectionContainer>
        <ContentContainer>
          <Intro parentClasses='content__intro' contentPath={TRANSLATION_PATH} />
          <Details parentClasses='content__details' />
        </ContentContainer>
      </SectionContainer>
    </Section>
  );
}
