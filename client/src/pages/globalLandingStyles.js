import styled, { createGlobalStyle } from "styled-components";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from "react-slick";



export const HeaderSlide = styled.div`
  background-image: ${props => `url(/static/img/background/${props.slide})`};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 40vw;
`;

export const CarouselFieldsWrapper = styled.div`
  margin: 0 auto;
  padding: 9vw 0;
  width: 70%;
  @media (max-width: 959px) {
    width: 90%;
    padding: 15px 0;
  }
`;

export const HeaderCarouselTypography = styled(Typography)`
  font-weight: 300!important;
`;

export const SendRequestButton = styled(Button)`
    background-image: linear-gradient(80deg, #2b5ba9 0%, #75bbe9 100%);
    
    &>span {
        color: #ffffff;
        padding: 5px 25px;
    }

    @media (max-width: 959px) {
      &>span {
        padding: 5px 15px;
      }
    }

    @media (max-width: 599px) {
      &>span {
        padding: 0 10px;
      }
    }
`;

export const HeaderCarouselInfoText = styled.div`
  margin: 20px 0;

  @media (max-width: 959px) {
    margin: 10px 0;
  }
`;

export const HeaderCarouselWrapper = styled(Slider)`
  position: relative;
  &>.slick-next {
    right: 0;
  }

  &>.slick-next:before {
    content: '';
  }

  &>.slick-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  &>.slick-dots li {
    margin: 0;
  }

  &>.slick-dots li button::before {
    color: #fff;
  }
`;

export const CarouselInfoField = styled.div`
  width: 450px;
  color: ${props => `${props.textColor}`};
  
  @media (max-width: 959px) {
    width: 100%;
  }
`;

export const FieldsWrapper = styled.div`
  margin: 0 auto;
  padding: 80px 0;
  width: 70%;

  @media (max-width: 959px) {
    width: 90%;
  }
`;

export const ReviewSlide = styled.div`
  background-image: ${props => `url(/static/img/background/${props.slide})`};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 30vw;
  position: relative;
`;

export const ReviewQuote = styled.div`
  background-image: url(/static/img/icons/qoute.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 50px;
  width: 50px;
  position: absolute;
  top: -30px;
  left: -4%;
  transform: translate(-50%, 0);
  z-index: -1;

  @media (max-width: 959px) {
    height: 30px;
    width: 30px;
    top: -15px;
  }
`;

export const ReviewCarouselWrapper = styled(Slider)`
  position: relative;
  color: #fff;
  &>.slick-next {
    right: 0;
  }

  &>.slick-next:before {
    content: '';
  }

  &>.slick-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  &>.slick-dots li {
    margin: 0;
  }

  &>.slick-dots li button::before {
    color: #fff;
  }
`;


export const ReviewCarouselInfo = styled.div`
  position: absolute;
  top: 25%;
  left: 52%;
  width: 460px;
  z-index: 111;

  &>div:nth-of-type(2) {
    margin-bottom: 30px;
  }

  @media (max-width: 959px) {
    top: 40px;
    left: 40px;
  }
`;