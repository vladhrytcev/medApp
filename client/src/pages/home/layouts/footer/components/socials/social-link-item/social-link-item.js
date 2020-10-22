import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SocialLink } from './social-link-item.style';

export const SocialLinkItem = ({ iconSrc, iconSrcSet, alt, width, height, ...rest }) => {
  return (
    <SocialLink {...rest}>
      <picture>
        <source media="(max-width: 860px)" srcSet={iconSrcSet} />
        <img src={iconSrc} width={width} height={height} alt={alt} />
      </picture>
    </SocialLink>
  );
}

SocialLinkItem.propTypes = {
  iconSrc: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

SocialLinkItem.defaultProps = {
  width: '16',
  height: '16'
}
