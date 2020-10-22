import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Helmet } from 'react-helmet';

export const HelmetComponent = ({ sectionHead, ...rest }) => {
  const { t } = useTranslation();
  const subsectionHead = `${sectionHead}.meta`;
  const metas = t(`${subsectionHead}`, { returnObjects: true })
  
  return (
	<Helmet>
		{metas.map((index, _id) => {
			if (index.name == 'title') { 
				return ( <title key={_id} >{index.content}</title> );
			} else {
				return ( <meta key={_id} name={index.name} content={index.content} /> );
			}
		})}
	</Helmet>
  );
};
