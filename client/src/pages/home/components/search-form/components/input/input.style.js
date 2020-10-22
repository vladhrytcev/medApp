import styled from 'styled-components';

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  input {
    display: block;
    width: 100%;
    min-width: 140px;
    margin: 0;
    padding: 21px 26px 18px;
    font-family: inherit;
    font-weight: 600;
    font-size: 1.1875rem;
    line-height: 1em;
    letter-spacing: -0.3px;
    color: inherit;
    box-sizing: border-box;
    border: 1px solid #e3e5e8;
    border-radius: 6px;
    box-shadow: inset 0 1px 3px 1px rgba(51, 60, 77, 0.06);
    outline: none;

    &.not-valid {
      border: 1px solid red;
    }

    ::placeholder {
      color: #828898;
    }

    @media(max-width: 840px) {
      padding: 20px 20px 16px;
      font-size: 1.0625rem;
      line-height: 1.25rem;
      border-radius: 4px;
    }

    @media(max-width: 480px) {
      font-size: 1rem;
    }
  }

  span.input-label {
    font-family: OpenSans;
    font-size: 13px;
    line-height: 1.54;
    color: #eb4f3d;
  }

  span.hidden-input-label {
    display: none;
  }
`;
