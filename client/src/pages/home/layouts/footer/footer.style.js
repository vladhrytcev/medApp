import styled from 'styled-components';

export const FooterSection = styled.footer`
  padding: 66px 0;

  @media(max-width: 768px) {
    padding: 38px 0;
  }

  @media(max-width: 480px) {
    padding: 78px 0 46px;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 128px;
  font-family: 'OpenSans', sans-serif;
  font-weight: 400;
  font-size: 0.8125rem;
  line-height: 2.1539em;
  color: #525f7a;
 
  @media(max-width: 1120px) {
    padding: 0;
  }

  @media(max-width: 768px) {
    flex-wrap: wrap;
  }

  @media(max-width: 480px) {
    flex-direction: column;
  }
`;

export const FooterLogo = styled.div`
  width: 36px;
  height: auto;
  margin-right: 20px;

  @media(max-width: 480px) {
    margin-right: 0;
  }
`;

export const FooterNav = styled.div`
  margin-right: auto;
  margin-left: 28px;
  padding-left: 28px;
  border-left: 1px solid #a4abb9;

  ul {

    li {
      margin-right: 28px;

      &:last-child {
        margin-right: 0;
      }

      a {
        color: inherit;

        &:hover,
        &:focus {
          color: #909ebd;
        }
      }
    }
  }

  @media(max-width: 768px) {
    margin-right: 0;
    margin-left: auto;
    padding: 0;
    border-left: none;

    ul {
      li {
        margin-right: 36px;
        font-size: 0.8125rem;
        line-height: 1.5rem;
      }
    }
  }

  @media(max-width: 480px) {
    margin-left: 0;
    margin-top: 53px;

    ul {
      flex-direction: column;
      li {
        margin-right: 0;
        text-align: center;

        :not(:last-child) {
          margin-bottom: 16px
        }
      }
    }
  }
`;

export const FooterBottomRow = styled.div`
  @media(max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 38px;
    padding-top: 30px;
    border-top: 1px solid rgba(164, 171, 185, 0.2);

    .footer-bottom-row__copyright {
      font-size: 0.6875rem;
      line-height: 1.75rem;
    }
  }

  @media(max-width: 480px) {
    flex-direction: column-reverse;
    margin-top: 73px;
    padding-top: 0;
    border-top: none;

    .footer-bottom-row__copyright {
      font-size: 0.625rem;
      margin-top: 38px;
    }
  }
`;
