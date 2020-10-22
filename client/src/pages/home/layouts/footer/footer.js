import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { TabletAndMobile, OnlyDesktop } from '../../service/mediaQuery';

import { List, LogoSmall } from '../../components';
import { SectionContainer } from '../section-container';
import { Copyright, Socials, SocialLinkItem, Icons } from './components';
import { FooterSection, FooterContainer, FooterNav, FooterLogo, FooterBottomRow } from './footer.style';

export const Footer = ({ homeUrl }) => {
  const TRANSLATION_PATH = 'global.footer.landing'
  const { t } = useTranslation();
  const navList = Object.keys(t(`${TRANSLATION_PATH}.navigation`, { returnObjects: true }));

  return (
    <FooterSection>
      <SectionContainer>
        <FooterContainer>
          <FooterLogo>
            <LogoSmall />
          </FooterLogo>
          <OnlyDesktop>
            <Copyright />
          </OnlyDesktop>
          <FooterNav>
            <List>
              {
                navList.map(path => {
                  return (
                    <Link key={path} to={`${homeUrl}/${path}`}>{t(`${TRANSLATION_PATH}.navigation.${path}`)}</Link>
                  );
                })
              }
            </List>
          </FooterNav>
          <FooterBottomRow>
            <TabletAndMobile>
              <Copyright className="footer-bottom-row__copyright" />
            </TabletAndMobile>
            <Socials>
              {/* <SocialLinkItem to="/" alt='Facebook' iconSrc={Icons.facebook} iconSrcSet={Icons.facebookDark} />
				  <SocialLinkItem to="/" alt='Twitter' iconSrc={Icons.twitter} iconSrcSet={Icons.twitterDark} />
				  */}
				<SocialLinkItem to="/" alt='LinkedIn' iconSrc={Icons.linkedin} iconSrcSet={Icons.linkedinDark} />
            </Socials>
          </FooterBottomRow>
        </FooterContainer>
      </SectionContainer>
    </FooterSection>
  );
}

export default Footer;
