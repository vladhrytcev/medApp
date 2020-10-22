import styled from "styled-components";
import { Link } from 'react-router-dom';

export const SocialLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background-color: #525f7a;
  border-radius: 50%;
  text-decoration: none;

  &:hover,
  &:focus {
    background-color: #909ebd;
  }

  picture {
    line-height: 0;

    img {
      width: auto;
      height: 16px;
      object-fit: cover;
    }
  }

  @media(max-width: 860px) {
    width: auto;
    height: 16px;
    background-color: transparent;
    border-radius: 0;

    &:hover,
    &:focus {
      background-color: transparent;
    }
  }
`;