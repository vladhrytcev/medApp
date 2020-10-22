import React, { useEffect } from 'react';
import _ from "lodash";

import { Button } from '../../../../../../components/common/button';
import { StyledLanguageMenuList } from './language-menu-list.style';

export const LanguageMenuList = ({ list, onItemClick, escPressHandler }) => {

  const keyDownHandler = (event) => {
    const { code, keyCode } = event;
    if (code === 'Escape' || keyCode === 27) {
      escPressHandler();
    }
    return;
  };

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);

    return (() => {
      document.removeEventListener('keydown', keyDownHandler);
    })
  });

  return (
    <StyledLanguageMenuList>
      {
        React.Children.map(list, (item) => {
          return (
            <li>
              <Button variant='text' label={_.capitalize(item)} onClick={() => onItemClick(item)} />
            </li>
          );
        })
      }
    </StyledLanguageMenuList>
  )
};
