import React from 'react';
import PropTypes from 'prop-types';
import { IntroImageContainer } from './intro-image.style';

export const IntroImage = ({ srcImg, width, height, alt }) => {
  return (
    <IntroImageContainer>
      <img src={srcImg} width={`${width}`} height={`${height}`} alt={alt} />
    </IntroImageContainer>
  );
}

IntroImage.propTypes = {
  srcImg: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  alt: PropTypes.string
};

IntroImage.defaultProps = {
  alt: 'Intro image'
};
