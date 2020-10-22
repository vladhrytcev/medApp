import styled from 'styled-components';

export const FormWrapper = styled.div`
  width: 100%;
  border-radius: 4px;
  background-color: #ffffff;

  .form__close-btn {
    position: fixed;
    top: 46px;
    right: 40px;

    @media(max-width: 480px) {
      top: 12px;
      right: 12px;
    }
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  /* @media(max-width: 840px) {
    height: 100%;
    overflow-y: auto;
  } */
  
  .search-field-set {
    position: relative;
    z-index: 1;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    box-sizing: border-box;
    padding: 15px 0;
    padding-right: 18px;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 20px 60px 0 rgba(51, 60, 77, 0.1);
  
    @media(max-width: 840px) {
      flex-wrap: wrap;
      padding: 0;
      padding-top: 13px;
  
      .search-btn {
        width: 100%;
        margin-top: 13px;
  
        &.MuiButton-root.MuiButton-contained {
          border-radius: 4px;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }
      }
    }
  
    @media(max-width: 480px) {
      padding-top: 0;
  
      .search-btn {
        margin-top: 0;
      }
    }
  }

  .contact-field-set {
    display: none;
    width: 100%;
    max-width: 1120px;
    padding: 55px 95px 50px;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 4px;
    overflow-y: auto;

    @media(max-width: 840px) {
      margin-top: 55px;
      padding: 0;
      /* padding: 55px 0 35px; */
    }

    @media(max-width: 480px) {
      margin-top: 30px;
      /* padding: 30px 0 30px; */
    }

    &.opened {
      display: block;
    }
  }

  .contact-field-set__wrapper {
    display: flex;
    flex-direction: column;
    height: auto;

    .form__item {
      width: calc(50% - 12px);
      
      @media(max-width: 480px) {
        width: 100%;
      }
    }
      
    .form__intro {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 40px;

      @media(max-width: 480px) {
        margin-bottom: 12px;
      }
    }
        
    .form__title {
      margin: 0;
      font-family: inherit;
      font-weight: 600;
      font-size: 1.375rem;
      line-height: 1.75rem;
      letter-spacing: -0.38px;
      color: inherit;

      @media(max-width: 840px) {
        line-height: 1.5rem;
      }

      @media(max-width: 480px) {
        text-align: center;
      }
    }

    .form__sub-title {
      margin: 0;
      font-family: 'OpenSans', serif;
      font-weight: 400;
      font-size: 1rem;
      line-height: 1.625rem;
      color: #525f7a;

      @media(max-width: 840px) {
        font-size: 0.875rem;
      }

      @media(max-width: 480px) {
        margin-bottom: 26px;
        text-align: center;
      }
    }

    .form__date-selector {
      position: absolute;
      z-index: 1;
      top: 100%;
      right: 0;
      display: none;
      width: 640px;
      transform: translateX(95px);

      &.opened {
        display: flex;
        flex-direction: column;
      }

      @media(max-width: 840px) {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: none;
        
        width: auto;
        padding: 112px 40px 64px;
      }

      @media(max-width: 480px) {
        padding: 48px 12px 64px;
      }
    }

    .form__contact {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 10px;
      padding: 40px 0;
      border-top: 1px dashed #e3e5e8;

      &-item {
        margin-bottom: 24px;
      }

      &-submit {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: flex-start;
        padding-top: 16px;
      }

      @media(max-width: 840px) {
        flex-grow: 1;
        align-content: flex-start;
        margin-bottom: 0;
        border-bottom: 1px dashed #e3e5e8;

        &-item {
          margin-bottom: 16px;
        }
      }

      @media(max-width: 480px) {
        padding: 0;
        border: none;

        &-item {
          margin-bottom: 12px;
        }

        &-submit {
          flex-wrap: wrap;
          padding-top: 13px;
        }
      }
    }

    .form__agreement {
      font-family: "OpenSans", serif;
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.375rem;
      color: #525f7a;

      @media(max-width: 840px) {
        font-size: 0.8125rem;
        line-height: 1.25rem;
      }

      @media(max-width: 480px) {
        margin-bottom: 25px;
      }
    }

    .form__callback {
      margin: 0;
      margin-left: auto;
      font-family: inherit;
      font-size: 1.0625rem;
      font-weight: 600;
      line-height: 1em;
      color: #828898;
      text-align: center;

      a {
        display: inline-block;
        margin-left: 10px;
        color: #525f7a;
        text-decoration: none;
      }

      @media(max-width: 840px) {
        width: 100%;
        padding: 40px 0 35px;
      }

      @media(max-width: 480px) {
        padding: 35px 0 30px;
      }
    }
  }

`;
