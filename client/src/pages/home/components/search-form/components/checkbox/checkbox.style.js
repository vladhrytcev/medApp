import styled from 'styled-components';

export const CheckboxWrapper = styled.label`
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding-left: 38px;
  font: inherit;
  color: inherit;

  .check__input {
    position: absolute;
    appearance: none;
    height: 0;
    width: 0;
    opacity: 0;
  }

  .check__box {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    box-sizing: border-box;
    width: 24px;
    height: 24px;
    border: 1px solid #e3e5e8;
    border-radius: 6px;
    box-shadow: inset 0 1px 3px 1px rgba(51, 60, 77, 0.06);
  }

  .check__input:checked + .check__box {
    background-color: #5978e3;
    background-image: url("/static/img/icons/check.svg");
    background-repeat: no-repeat;
    background-size: 12px;
    background-position: center;
    border-color: #7d94e3
  }

  @media(max-width: 840px) {
    padding-left: 32px;
    
    .check__box {
      width: 20px;
      height: 20px;
      border-radius: 4px;
    }
  }
`;
