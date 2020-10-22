import styled from 'styled-components';

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: 15px 30px 13px;

  :not(:first-child) {
    border-left: 1px dashed #e3e5e8;
  }

  @media(max-width: 840px) {
    width: 50%;
    padding: 7px 18px 5px;
    background-color: #ffffff;
  }

  @media(max-width: 480px) {
    width: 100%;
    padding: 16px 20px;

    :first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    :not(:first-child) {
      border-left: none;
      border-top: 1px dashed #e3e5e8;
    }
  }
`;

export const StyledLabel = styled.label`
  margin-bottom: 8px;
  font-size: 0.9375rem;
  line-height: 1em;
  color: #828898;
  text-transform: uppercase;
  letter-spacing: 0.4px;

  @media(max-width: 840px) {
    margin-bottom: 5px;
    font-size: 0.8125rem;
    letter-spacing: 0.35px;
  }

  @media(max-width: 480px) {
    display: none;
  }
`;

export const StyledInput = styled.input`
  padding: 0;
  font-family: inherit;
  font-weight: 600;
  font-size: 1.1875rem;
  line-height: 1em;
  letter-spacing: -0.3px;
  background-color: transparent;
  border: none;
  outline: none;

  ::placeholder {
    color: #828898;
  }

  @media(max-width: 840px) {
    font-size: 1.0625rem;
    letter-spacing: -0.27px;
  }

  @media(max-width: 480px) {
    font-size: 1rem;
    letter-spacing: -0.25px;
  }
`;

export const StyledList = styled.ul`
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 8px;
  right: 8px;
  box-sizing: border-box;
  max-height: 294px;
  margin: 0;
  padding: 6px 8px;
  padding-right: 0;
  list-style: none;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 15px 40px 0 rgba(51, 60, 77, 0.2);
  transform: translateY(25px);
  overflow-x: hidden;
  overflow-y: scroll;

  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 22px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 16px;
    background-color: #e3e5e8;
    border: 7px solid #ffffff;
  }

  li {
    padding: 20px 16px 17px;
    font-size: 19px;
    line-height: 1em;
    letter-spacing: -0.3px;
    color: #828898;
    border-radius: 6px;
    cursor: pointer;

    :hover,
    :focus {
      color: #7d94e3;
      background-color: rgba(125, 148, 227, 0.1)
    }
  }

  @media(max-width: 840px) {
    left: 0;
    right: 0;
    max-height: 193px;
    transform: translateY(13px);
    border-radius: 4px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    ::-webkit-scrollbar {
      width: 20px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 14px;
      background-color: #e3e5e8;
      border: 7px solid #ffffff;
    }

    li {
      padding: 16px 11px 11px;
      font-size: 17px;
      letter-spacing: -0.27px;
    }
  }

  @media(max-width: 480px) {
    transform: none;

    li {
      font-size: 1rem;
      letter-spacing: -0.25px;
    }
  }
`;
