import styled from 'styled-components';

export const SearchContainer = styled.div`
  position: relative;
  padding-top: 50px;

  .search-form {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    max-width: 1120px;
    box-shadow: 0 20px 60px 0 rgba(51, 60, 77, 0.1);
    
    @media(max-width: 840px) {
      &.opened {
        position: fixed;
        z-index: 4;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display:flex;
        transform: none;

        padding: 112px 40px 0;
        box-sizing: border-box;
        background-color: #ffffff;
        box-shadow: none;
        overflow: hidden;
      }
    }

    @media(max-width: 480px) {
      &.opened {
        padding: 48px 12px 0;
      }
    }
  }

  @media(max-width: 840px) {
    padding-top: 77px;
  }

  @media(max-width: 480px) {
    padding-top: 105px;
  }
`;
