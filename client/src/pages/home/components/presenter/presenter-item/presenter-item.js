import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';
import { SubscriptionItem } from './presenter-item.style';

export const PresenterItem = ({ order, title, text, image, isActive, onClick }) => {
  return (
    <SubscriptionItem order={order} className={classNames({ 'active': isActive })} onClick={onClick}>
      <Typography variant='h3' className='subscription__title'>
        {title}
      </Typography>
      {
        text &&
        <Typography className='subscription__text'>
          {text}
        </Typography>
	  }
	  {
		image &&
		<img src={image.src} alt={image.alt} className='subscription__image' />
      }
    </SubscriptionItem>
  );
}

PresenterItem.propTypes = {
  order: PropTypes.number,
  title: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.object,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};
