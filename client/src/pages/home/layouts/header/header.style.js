import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';
import { SectionContainer } from '../section-container';

export const HeaderSection = styled.header`
  position: fixed;
  z-index: 3;
  width: 100vw;
  padding: 12px 0;
  transition: all 0.25s ease-in;

  &.filled {
    background-color: #ffffff;
    box-shadow: 0 20px 60px 0 rgba(51, 60, 77, 0.1);
  }

  @media(max-width: 1119px) {
    &.opened-menu {
      background-color: #ffffff;
      box-shadow: 0 20px 60px 0 rgba(51, 60, 77, 0.1);
    }
  }

  @media(max-width: 520px) {
    padding: 16px 0;
  }
  
  @media(max-width: 320px) {
    &.opened-menu {
      min-height: 100vh;
      box-shadow: none;
    }
  }
`;

export const HeaderContainer = styled(SectionContainer)`
  &.MuiContainer-root {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const HeaderLogo = styled.div`
  width: 170px;

  @media(max-width: 768px) {
    width: 159px;
  }

  @media(max-width: 540px) {
    width: 128px;
  }
`;

export const HeaderControl = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  color: inherit;

  a {
    line-height: 1em;
    color: inherit;
    text-decoration: none;
    outline: none;
  }

  .header-control__link {
    margin-right: 34px;
    padding: 1rem 0 0.875rem;

    ${({ theme }) => `
      &:hover,
      &:focus {
        color: ${theme.colors.brandPrimary};
      }
    `}
  }
  
  .header-control__link-btn {
    display: block;
    margin-left: 34px;
    padding: 1rem 1.375rem;
    padding-bottom: 0.875rem;
    border-radius: 6px;
    transition-property: background-color, box-shadow;
    transition-duration: 250ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: 0ms;
    ${({ theme }) => `
      color: ${theme.colors.textInvert};
      background-color: ${theme.colors.brandPrimary};
    `}

    &:hover,
    &:focus {
      ${({ theme }) => `
        color: ${theme.colors.textInvert};
      `}
      background-color: #5978e3;
      box-shadow: 0 0 14px 0 rgba(53,64,82,.05);
    }
  }

  .header-control__logout-btn {
    margin-left: 34px;
  }

  .burger-button {
    margin-left: 34px;
  }

  @media(max-width: 768px) {
    color: #828898;

    .header-control__link-btn {
      padding: 0.8125rem 1.25rem 0.625rem;
    }

    .burger-button {
      margin-left: 30px;
    }
  }
`;

const StyledHeaderNav = styled.nav`
  margin-left: 48px;
  padding-left: 48px;
  border-left: 1px solid #dbdde2;

  li {
    :not(:last-of-type) {
      margin-right: 40px;
    }

    a {
      span {
        position: relative;
        padding-top: 1rem;
        padding-bottom: 0.875rem;
        line-height: 1em; 
        display: inline-block;
      }

      &.active {
        cursor: default;

        span::after {
          content: '';
          position: absolute;
          display: block;
          bottom: 0;
          width: 100%;
          height: 2px;
          background-color: #000000;
        }
      }

      ${({ theme }) => `
        &:not(.active):hover {
          color: ${theme.colors.brandPrimary};
        }

        &:not(.active):focus {
          color: ${theme.colors.brandPrimary};
        }
      `}
    }
  }

  @media(max-width: 1119px) {
    order: 1;
    display: none;
    width: 100%;
    margin: 0;
    padding: 60px 0 90px;
    border: none;


    &.opened {
      display: block;      
    }

    ul {
      flex-direction: column;

      li {
        :not(:last-of-type) {
          margin: 0;
        }

        a {
          text-align: center;

          span {
            padding: 28px 0 9px;
          }
        }

        .header-nav__link-btn {
          display: block;
          padding: 1.0625rem 1.375em 0.875rem;
          border-radius: 6px;
          transition-property: background-color, box-shadow;
          transition-duration: 250ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-delay: 0ms;
          ${({ theme }) => `
            color: ${theme.colors.textInvert};
            background-color: ${theme.colors.brandPrimary};
          `}

          &:hover,
          &:focus {
            ${({ theme }) => `
              color: ${theme.colors.textInvert};
            `}
            background-color: #5978e3;
            box-shadow: 0 0 14px 0 rgba(53,64,82,.05);
          }
        }
      }
    }
  }

  @media(max-width: 520px) {
    ul>li:last-child {
      margin-top: 70px;
      align-self: center;
    }
  }

  @media(max-width: 320px) {
  }
`;

export const HeaderNav = withTheme(StyledHeaderNav);
