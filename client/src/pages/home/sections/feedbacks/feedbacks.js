import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import {
  FeedbacksContainer,
  FeedbacksSlider,
  FeedbackSlide,
  feedbackStyles
} from './feedbacks.style';
import { Section, SectionContainer } from '../../layouts';

export const Feedbacks = ({ sectionBgColor, sectionHead }) => {
  const TRANSLATE_PATH = `${sectionHead}.feedbacks`;
  const classes = feedbackStyles();
  const { t } = useTranslation();
  const feedbacks = t(`${TRANSLATE_PATH}.list`, { returnObjects: true });
  const settings = {
    dots: true,
    arrow: true,
    autoplay: false
  }

  return (
    <Section bgColor={sectionBgColor}>
      <SectionContainer>
        <FeedbacksContainer>
          <FeedbacksSlider {...settings}>
            {
              feedbacks.map(({ _id, text, author }) => {
                return (
                  <FeedbackSlide key={_id}>
                    <blockquote>
                      <p className={classes.feedbackText}>
                        {text}
                      </p>
                      <cite className={classes.feedbackAuthor}>
                        {`— ${author}`}
                      </cite>
                    </blockquote>
                  </FeedbackSlide>
                );
              })
            }
          </FeedbacksSlider>
        </FeedbacksContainer>
      </SectionContainer>
    </Section>
  )
}