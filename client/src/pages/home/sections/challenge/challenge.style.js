import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import breakpoints from '../../../../theme/breakpoints';

const { values } = breakpoints;

export const ChallengeContainer = styled.div`
  padding: 140px 0px 155px;
  @media (max-width: ${values.md}px) {
    padding: 98px 0px 109px;
  }
`;

export const ChallengeList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0;
  padding: 0;
  list-style: none;
  @media (max-width: ${values.sm}px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ChallengeItem = styled.li`
  width: 208px;
  

  :not(:last-child) {
    position: relative;
    padding-right: 176px;

    ::after {
      content:'';
      position: absolute;
      top: 0;
      right: 0;
      display: block;
      width: 176px;
      height: 208px;
      background-image: url('/static/img/icons/plus.svg');
      background-repeat: no-repeat;
      background-size: 24px;
      background-position: center;
    }
  }
  @media (max-width: ${values.md}px) {
    width: 160px;
    :not(:last-child) {
      position: relative;
      padding-right: 80px;
  
      ::after {
        content:'';
        position: absolute;
        top: 0;
        right: 0;
        display: block;
        width: 80px;
        height: 160px;
        background-image: url('/static/img/icons/plus.svg');
        background-repeat: no-repeat;
        background-size: 24px;
        background-position: center;
      }
  }
  @media (max-width: ${values.sm}px) {
    width: 160px;
    :not(:last-child) {
      position: relative;
      padding-right: 0;
  
      ::after {
        content:'';
        position: relative;
        top: 0;
        right: 0;
        left: 40px;
        display: block;
        width: 80px;
        height: 100px;
        background-image: url('/static/img/icons/plus.svg');
        background-repeat: no-repeat;
        background-size: 24px;
        background-position: center;
      }
  }
`;

export const challengeStyles = makeStyles(theme => ({
  title: {
    maxWidth: 460,
    margin: '0 auto',
    marginBottom: '1.88em',
    lineHeight: '1.08em',
    letterSpacing: '-1px',
    textAlign: 'center',
    [`@media (max-width: ${values.md}px)`]: {
      fontSize: '2.333rem',
      fontWeight: 600,
      lineHeight: 1.08,
      letterSpacing: -0.74
    },
    [`@media (max-width: ${values.sm}px)`]: {
      fontSize: '2.25rem'
    }
  },
  challengeItemImage: {
    display: 'block',
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    marginBottom: 25
  },
  challengeItemTitle: {
    lineHeight: '1.2728em',
    textAlign: 'center',
    letterSpacing: '-0.38px',
    [`@media (max-width: ${values.md}px)`]: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.35px'
    }
  }
}));
