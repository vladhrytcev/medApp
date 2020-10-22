import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { TabletNavigation, MobileNavigation, NotMobileNavigation } from '../../service/mediaQuery';

import { LogoLink, NavMenu, LanguageMenu, BurgerButton, Button } from '../../components';

import { HeaderSection, HeaderContainer, HeaderLogo, HeaderNav, HeaderControl } from './header.style';
import { HashLink as HLink } from 'react-router-hash-link';

export const Header = ({ homeUrl, local, onClickLogOut, onChangeLanguage }) => {
  const TRANSLATION_PATH = 'global.header.landing'
  const [shouldBgFill, setShouldBgFill] = useState(false);
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const MIN_SCROLL = 5;
    const { scrollTop } = document.documentElement || document.body;
    const isMinimumScrolled = scrollTop > MIN_SCROLL;

    setShouldBgFill(isMinimumScrolled);
  }
  
  const handleMenu = () => {
	  if(isOpenedMenu){
		  setIsOpenedMenu(!isOpenedMenu);
	  }
  }

  const { language, isAuthenticated } = local;
  const { t } = useTranslation();
  const navList = Object.keys(t(`${TRANSLATION_PATH}.navigation`, { returnObjects: true }));
  const login_address = `${homeUrl}/auth/sign-in`;
  const isDisabled = true;

  return (
    <HeaderSection className={classNames({ 'filled': shouldBgFill, 'opened-menu': isOpenedMenu })}>
      <HeaderContainer>
        <HeaderLogo>
          <LogoLink to={homeUrl} exact />
        </HeaderLogo>
        <HeaderNav className={classNames({ 'opened': isOpenedMenu })}>
          <NavMenu>
            {
              navList.map(item => {
                const path = item === 'home' ? '' : `/${item}`;
                return (
                  <NavLink key={item} to={`${homeUrl}${path}`} onClick={handleMenu} exact>
                    <span>
                      {t(`${TRANSLATION_PATH}.navigation.${item}`)}
                    </span>
                  </NavLink>
                );
              })
            }
            <TabletNavigation>
              <HLink to={`${homeUrl}#contact`}>
                <span>
                  {t(`${TRANSLATION_PATH}.contact`)}
                </span>
              </HLink>
            </TabletNavigation>
            <MobileNavigation>
              {!isAuthenticated & !isDisabled ?
                <NavLink className='header-nav__link-btn' to={login_address} >
                  {t(`${TRANSLATION_PATH}.login`)}
                </NavLink> :
                <Button className='header-nav__logout-btn' label={t(`${TRANSLATION_PATH}.logout`)} onClick={() => onClickLogOut()} />
              }
            </MobileNavigation>
          </NavMenu>
        </HeaderNav>
        <HeaderControl>
          <NotMobileNavigation>
            <HLink className='header-control__link' to={`#contact`}>{t(`${TRANSLATION_PATH}.contact`)}</HLink>
          </NotMobileNavigation>
          <LanguageMenu language={language} onChange={onChangeLanguage} />
          <NotMobileNavigation>
            {!isAuthenticated & !isDisabled ?
              <a className='header-control__link-btn' href={login_address} >
                {t(`${TRANSLATION_PATH}.login`)}
              </a> :
              <Button className='header-control__logout-btn' label={t(`${TRANSLATION_PATH}.logout`)} onClick={() => onClickLogOut()} />
            }
          </NotMobileNavigation>
          <TabletNavigation>
            <BurgerButton isActive={isOpenedMenu} onClick={() => setIsOpenedMenu(!isOpenedMenu)} />
          </TabletNavigation>
        </HeaderControl>
      </HeaderContainer>
    </HeaderSection>
  );
};
