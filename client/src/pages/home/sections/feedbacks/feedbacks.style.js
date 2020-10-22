import styled from 'styled-components';
import Slider from 'react-slick';
import { makeStyles } from '@material-ui/core/styles';

export const FeedbacksContainer = styled.div`
  padding: 150px 128px 95px;
  @media (max-width: 769px) {
    padding: 56px 0 44px;
  }
  @media (max-width: 959px) {
    padding: 150px 6px 95px; 
  }
`;

export const FeedbacksSlider = styled(Slider)`
  .slick-track {
    display: flex;
    align-items: stretch;
  }

  .slick-slide {
    display: flex;
    flex-direction: column;
    height: auto;

    div {
      height: 100%;
    }
  }

  .slick-dots {
    bottom: 0;

    li {
      width: auto;
      height: auto;
      margin: 0;
    }
  }

  .slick-arrow {
    z-index: 1;
    width: 0.6875rem;
    height: 1.125rem;
    background-repeat: no-repeat;
    background-size: contain;

    ::before {
      display: none;
    }
  }

  .slick-prev {
    left: 0;
    background-image: url('/static/img/icons/arrow-prev.svg');
  }

  .slick-next {
    right: 0;
    background-image: url('/static/img/icons/arrow-next.svg');
  }
`;

export const FeedbackSlide = styled.div`
  box-sizing: border-box;
  padding-top: 75px;
  padding-bottom: 100px;
  background-image: url('/static/img/icons/feedback-quote.svg');
  background-repeat: no-repeat;
  background-size: 18px 14px;
  background-position: center top;
  outline: none;

  blockquote {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
  }
  @media (max-width: 769px) {
    padding-top: 48px;
    padding-bottom: 46px;
  }
`;

export const feedbackStyles = makeStyles(theme => ({
  feedbackText: {
    maxWidth: 670,
    ['@media(max-width: 959px)']: {
      width: 464
    },
    ['@media(max-width: 769px)']: {
      width: 'auto',
      padding: '0 50px',
    },
    margin: 'auto',
    fontSize: '1.375rem',
    lineHeight: '1.4545em',
    textAlign: 'center',
  },
  feedbackAuthor: {
    display: 'block',
    margin: '0 auto',
    marginTop: '40px',
    fontSize: 'inherit',
    fontStyle: 'normal',
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: '1em',
    letterSpacing: '-0.42px',
    textAlign: 'center'
  }
}));
