import styled from "styled-components";
import { withTheme } from '@material-ui/core/styles';

const StyledContentContainer = styled.div`
  display: flex;
  margin: 0 -32px;
  align-items: flex-end;
  padding: 140px 128px 150px;
  @media (max-width: 769px) {
    padding: 68px 15px 74px;
    flex-direction: column;
    align-items: flex-start;
  }
  @media (max-width: 959px) {
    padding: 74px 15px 30px;
    flex-direction: column;
    align-items: flex-start;
  }
  background-color: #333c4d;
  background-image: url('/static/img/background/contact-us.svg');
  @media (max-width: 769px) {
    background-image: url('/static/img/background/group-10.svg');
    margin: 0 -40px;
  }
  background-repeat: no-repeat;
  background-size: cover;
  ${({ theme }) => `
    color: ${theme.colors.textInvert};
  `}

  .content__intro {
    max-width: 544px;
    @media (max-width: 959px) {
      max-width: 617px;
    }
  }

  .content__details {
    margin-left: 128px;
    padding-left: 128px;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    @media (max-width: 769px) {
      border-style: none;
      margin: 0;
      padding-left: 0;
      flex-direction: column;
    }
    @media (max-width: 959px) {
      display: flex;
      align-items: start;
      border-style: none;
      margin-top: 52px;
      margin-left: 0;
      padding-left: 0;
      min-width: 320px;
    }
  }
`;

export const ContentContainer = withTheme(StyledContentContainer);
