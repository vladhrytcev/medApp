import React from 'react';
import { useTranslation } from 'react-i18next';

import { Main, Section, SectionContainer } from '../../layouts';
import { PageTitle, IntroImage, HelmetComponent } from '../../components';
import { OurPartners, OurPromise, ContactUs } from '../../sections';
import breakpoints from '../../../../theme/breakpoints';

export const AboutUs = () => {
  const { t } = useTranslation();
  const sectionHead = 'about-us';
  const { values } = breakpoints;
  const imageData = t(`${sectionHead}.intro-image`, { returnObjects: true });
  const imageTabletData = t(`${sectionHead}.intro-image-tablet`, { returnObjects: true });
  const imageMobileData = t(`${sectionHead}.intro-image-mobile`, { returnObjects: true });
  const isClient = typeof window === 'object';
  const [screenWidth, setScreenWidth] = React.useState(getSize);
  
  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined
    };
  }

  React.useEffect(() => {
    if (!isClient) {
      return false;
    }
    function handleResize() {
      setScreenWidth(getSize());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function getIntroImage() {
    const { width } = screenWidth;
    if (width < values.sm) {
      return (<IntroImage srcImg={imageMobileData.src} width={`${width}`} height='536' alt={imageMobileData.alt} />)
    } if (width > values.sm && width < values.md) {
      return (<IntroImage srcImg={imageTabletData.src} width={`${width}`} height='536' alt={imageTabletData.alt} />)
    }
    return (<IntroImage srcImg={imageData.src} width='1376' height='536' alt={imageData.alt} />)
  }

  return (
    <>
    <HelmetComponent sectionHead={sectionHead} />
    <Main>
      <PageTitle sectionHead={sectionHead} />
      <Section>
        <SectionContainer>
          {getIntroImage()}
        </SectionContainer>
      </Section>
      <OurPartners sectionHead={sectionHead} />
      <OurPromise 
        sectionBgColor='#ffffff'
        sectionHead={sectionHead}
        width={screenWidth.width}
        breakpoints={breakpoints.values}
      />
      <ContactUs sectionBgColor='#ffffff' sectionHead={sectionHead} />
    </Main>
    </>
  );
};
