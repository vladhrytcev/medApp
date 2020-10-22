import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import {
  PresenterContainer,
  PresenterTextList,
  PresenterImagesContainer,
  PresenterImagesRow,
  PresenterImageItem,
  PresenterImageItemMobile,
  presenterStyles
} from './presenter.style';
import { PresenterItem } from './presenter-item';

export const Presenter = ({ list, title, imageWidth, sectionHead }) => {
  const classes = presenterStyles();
  const [active, setActive] = useState(0);

  const handleItemOnClick = step => {
    if (step === active) {
      return;
    }
    setActive(step);
  }

  return (
    <PresenterContainer>
      <PresenterTextList>
        {title &&
          <Typography variant='h2' className={classes.presenterTitle}>
            {title}
          </Typography>
        }
        {list.map(({ _id, title, text, image }, index) => {
          const order = index + 1;
          return (
            <div key={_id}>
              <PresenterItem
                key={_id}
                order={order}
                title={title}
                text={text}
				image={image}
                isActive={index === active}
                onClick={() => handleItemOnClick(index)}
                sectionHead={sectionHead}
              />
			  { order < list.length &&
				  <PresenterImageItemMobile
					key={`${_id}mobile`}
					order={order}
					title={title}
					text={text}
					image={image}
					isActive={index === active}
					imgWidth={imageWidth}
					sectionHead={sectionHead}
				  />
			  }
            </div>
          );
        })}
      </PresenterTextList>
      <PresenterImagesContainer maxWidth={imageWidth}>
        <PresenterImagesRow leftPosition={imageWidth * active}>
          {list.map(({ _id, image }) => {
            return (
              <PresenterImageItem key={_id} imgWidth={imageWidth}>
                <img src={image.src} alt={image.alt} />
              </PresenterImageItem>
            );
          })}
        </PresenterImagesRow>
      </PresenterImagesContainer>
    </PresenterContainer>
  );
}

Presenter.propTypes = {
  title: PropTypes.string,
  imageWidth: PropTypes.number,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
      image: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string
      })
    })
  )
};
