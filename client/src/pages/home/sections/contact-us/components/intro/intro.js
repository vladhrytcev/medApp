import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { introStyles } from './intro.style';

export const Intro = ({ parentClasses, contentPath }) => {
  const introClasses = introStyles();
  const { t } = useTranslation();

  return (
    <div className={classNames(parentClasses)}>
      <h2 className={classNames(introClasses.title)}>{t(`${contentPath}.title`)}</h2>
      <p className={classNames(introClasses.text)}>
        {t(`${contentPath}.text`)}
      </p>
    </div>
  );
};

Intro.propTypes = {
  parentClasses: PropTypes.string
};
