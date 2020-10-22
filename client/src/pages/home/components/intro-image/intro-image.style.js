import styled from "styled-components";
import breakpoints from '../../../../theme/breakpoints';

const { values } = breakpoints;

export const IntroImageContainer = styled.div`
  width: 100%;

  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  @media (max-width: ${values.md}px) {
    margin: 0 -32px 56px;
    width: auto;
    height: auto;
  }
  @media (max-width: ${values.sm}px) {
    margin: 0 -40px 43px;
    width: auto;
    height: auto;
  }
`;
