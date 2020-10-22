import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';

const StyledSubscriptionItem = styled.div`
  position: relative;
  padding-top: 49px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 116px;

  &::before {
    content: ${props => props.order};
	background-color: #ffffff;
	color: #000000;
    position: absolute;
    top: 0;
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    text-align: center;
    vertical-align: middle;
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
    line-height: 2.4em;
    border: 2px solid #000000;
    border-radius: 50%;
	font-family: Gilroy;
    font-size: 20px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.4;
    letter-spacing: -0.11px;
    text-align: center;
  }
  
  &.active {
    &::before {
      color: #ffffff;
      background-color: #000000;
    }
	&::after {
      content: '';
      width: 60px;
      border-bottom: solid 2px #000;
      position: absolute;
      left: calc(50% + 28px);
      top: 20px;
      z-index: 1;
    }
  }

  &:not(:last-of-type) {
    margin-bottom: 8px;
    padding-bottom: 25px;
    
    &::after {
      content: '';
      position: absolute;
      top: 48px;
      left: 19px;
      display: block;
      width: 2px;
      height: calc(100% - 48px);
      background-color: #000000;
    }
  }

  .subscription__title {
	font-family: OpenSans;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;
    text-align: center;
    color: #000000;
  }
`

export const SubscriptionItem = withTheme(StyledSubscriptionItem);
