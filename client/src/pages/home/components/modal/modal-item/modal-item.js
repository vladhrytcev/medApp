import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';
import { SubscriptionItem, StyledDivider } from './modal-item.style';

export const ModalBlockItem = ({ isActive, order, title }) => {
  return (
    <SubscriptionItem order={order} className={classNames({ 'active': isActive })} >
      <Typography variant='body1' className='subscription__title'>
        {title}
      </Typography>
    </SubscriptionItem>
  );
}

ModalBlockItem.propTypes = {
  order: PropTypes.string,
  title: PropTypes.string,
};
