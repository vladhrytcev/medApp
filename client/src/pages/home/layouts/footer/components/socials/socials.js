import React from 'react';
import { SocialList } from './socials.style';

export const Socials = ({ children }) => {
  return (
    <SocialList>
      {React.Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </SocialList>
  );
}
