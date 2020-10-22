import styled from 'styled-components';

export const StyledBurgerButton = styled.button`
  display: block;
  margin: 0;
  padding: 0;
  font: inherit;
  color: inherit;
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;

  .burger-button__box {
    position: relative;
    display: block;
    width: 24px;
    height: 24px;

    ::before,
    ::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      display: block;
      height: 2px;
      background-color: #000000;
      transition-property: transform, margin;
      transition-duration: 0.15s;
      transition-timing-function: ease;
      
    }

    ::before {
      margin-top: -7px;
    }

    ::after {
      margin-top: 5px;
    }
  }

  .burger-button__inner {
    position: absolute;
    top: 50%;
    display: block;
    width: 100%;
    height: 2px;
    margin-top: -1px;
    background-color: #000000;
    transition-property: opacity;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }

  &.active {
    .burger-button__box {
      ::before,
      ::after {
        margin-top: 0;
      }

      ::before {
        transform: rotate(45deg);
      }
      ::after {
        transform: rotate(-45deg);
      }
    }

    .burger-button__inner {
      opacity: 0;
    }
  }
`;
