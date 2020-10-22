import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { Button } from '../common';
import { LanguageMenuList } from "./components";
import { LanguageMenuContainer } from "./language-menu.style";

export const LanguageMenu = ({ language, onChange }) => {
  const { i18n } = useTranslation();
  const allLanguages = Object.keys(i18n.options.resources);
  const filteredLanguages = allLanguages.filter(item => item !== language);
  const [shouldShowMenu, setShouldShowMenu] = useState(false);

  const handleOpenMenu = () => {
    setShouldShowMenu(!shouldShowMenu);
  };

  const handleItemClick = (lang) => {
    if (lang) {
      onChange(lang.toLowerCase());
    }
    setShouldShowMenu(!shouldShowMenu);
  };

  return (
    <LanguageMenuContainer>
      <Button variant='text' label={_.capitalize(language)} onClick={handleOpenMenu} />
      {shouldShowMenu && <LanguageMenuList list={filteredLanguages} onItemClick={handleItemClick} escPressHandler={() => setShouldShowMenu(false)} />}
    </LanguageMenuContainer>
  );
}
