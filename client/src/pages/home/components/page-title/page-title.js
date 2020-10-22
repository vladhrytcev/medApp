import React from 'react';
import classNames from 'classnames';
import { titleStyles } from './page-title.style';
import { useTranslation, Trans } from 'react-i18next';

export const PageTitle = ({ sectionHead, className, children, id, ...rest }) => {
  const classes = titleStyles();
  const { t } = useTranslation();
  const subsectionHead = `${sectionHead}.title`;
  
  return (
	<Trans parent='h1' className={classNames(className, classes.pageTitle)} i18nKey={subsectionHead} id={id}>
		<br />
	</Trans>
  );
};
