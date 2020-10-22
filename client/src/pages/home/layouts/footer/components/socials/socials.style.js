import styled from "styled-components";

export const SocialList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    margin-right: 6px;

    :last-of-type{
      margin-right: 0;
    }
  }

  @media(max-width: 860px) {
    li {
      margin-right: 32px;
    }
  }
`;
