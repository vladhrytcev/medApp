import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DetailItem } from './details.style';
import { useTranslation } from 'react-i18next';

export const Details = ({ parentClasses }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(parentClasses)}>
      <DetailItem>
        <h3>{t('global.footer.landing.contact-us-details.call-us')}</h3>
        <a href={t('global.phone.ref')}>{t('global.phone.number')}</a>
      </DetailItem>
      <DetailItem>
        <h3>{t('global.footer.landing.contact-us-details.email-us')}</h3>
        <a href={`mailto:${t('global.email')}`}>{t('global.email')}</a>
      </DetailItem>
    </div>
  );
}

Details.propTypes = {
  parentClasses: PropTypes.string
}
