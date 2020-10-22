import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';

const StyledSubscriptionItem = styled.div`
  position: relative;
  padding-top: 5px;
  padding-left: 80px;
  @media (max-width: 769px) {
    padding-left: 50px;
  }
  cursor: pointer;

  &::before {
    content: '${props => props.order}';
    position: absolute;
    top: 0;
    left: 0;
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
  }

  &.active {
    cursor: default;
    
    &::before {
      color: #ffffff;
      background-color: #000000;
    }

    .subscription__text {
      display: block;
    }
	@media (max-width: 959px) {
		.subscription__image {
			display: block;
		}
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
    line-height: 1.28em;
  }

  .subscription__text {
    display: none;
    margin-top: 18px;
    font-family: 'OpenSans', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.625em;
    color: #333c4d;
  }
  
  .subscription__image {
	  display: none;
	  margin-top: 18px;
	  max-width: 90%;
	  max-height: 70vh;
  }
`

export const SubscriptionItem = withTheme(StyledSubscriptionItem);
