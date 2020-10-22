import styled, { createGlobalStyle } from "styled-components";
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Slider from "react-slick";


export const HeaderWrapper = styled.div`
    margin: 0 auto;
    padding: 20px 0;
    width: 70%;
    @media (max-width: 959px) {
      width: 96%;
    }
`;

export const SendRequestHeaderButton = styled(Button)`
    background-image: linear-gradient(80deg, #2b5ba9 0%, #75bbe9 100%);
    
    &>span {
        color: #ffffff;
        padding: 0 15px;
    }

    @media (max-width: 959px) {
      &>span {
        padding: 0 10px;
      }
    }
`;

export const NavLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:not([data='footer-link']) {
      margin: 0 30px;
    }

    @media (max-width: 1279px) {
      &:not([data='footer-link']) {
        margin: 0 15px;
      }
    }
`;

export const NavLinkButton = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const AdvantagesBox = styled(Box)`
  text-align: center;  

  &:hover {
      border-radius: 4px;
      box-shadow: 0px 7px 9.5px rgba(207,219,228,0.68);
    }
`;

export const IconBox = styled.div`
    width: 100px;
    height: 100px;  
    background-image: ${props => `url(/static/img/icons/Advantages${props.number}.png)`};
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 0 auto;

    @media (max-width: 959px) {
      height: 70px;
      width: 70px;
    }

    @media (max-width: 599px) {
      height: 50px;
      width: 50px;
    }
`;

export const AdvantagesInfo = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px 0 30px;
`;

export const TypographyHeader = styled(Typography)`
    text-align: center;

    &>span {
      color: #2c57a9;
    }
`;

export const TypographyText = styled(Typography)`
  text-align: center;
  font-weight: 300!important;
`;

export const TypographyTextWrapper = styled.div`
  margin: 30px 0;
`;


/////// our partners //////////

export const OurPartnersIcon = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 959px) {
    height: 70px;
    margin: 20px 0;
  }

  @media (max-width: 599px) {
    height: 50px;
  }
`;

///////// contacts ////////////

export const ContactFace = styled.div`
  width: 100%;
  text-align: center;

  &>img {
    width: 100%;
  }

  @media (max-width: 959px) {
    width: 80vw;
    margin: 10px auto;
  }
`;

export const CallIcon = styled.div`
  width: 60px;
  height: 60px;  
  background-image: url(/static/img/icons/callIcon.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 0 30px 0 0;

  @media (max-width: 959px) {
    width: 40px;
    height: 40px;
  }
`;

export const ContactFieldWrapper = styled.div`
  margin: 0 auto;
  padding: 80px 0;
  width: 50%;

  @media (max-width: 1279px) {
    width: 80%;
  }

  @media (max-width: 959px) {
    width: 100%;
  }
`;

export const ContactForm = styled.form`
  margin: 50px auto 0;
  text-align: center;

  & .MuiFormHelperText-root {
    margin-top: 0;
  }

  @media (max-width: 959px) {
    width: 80%;
  }
`;

export const FormTextField = styled(TextField)`
  width: 100%;
`;

export const FormFieldWrapper = styled.div`
  margin: 30px 0;
`;


//////// LandingFooter ////////////

export const FooterWrapper = styled.div`
  background: #28292b;

  @media (max-width: 959px) {
    padding: 0 50px;
  }
`;

export const FooterColumnItem = styled.div`

`;

export const TypographyColumnItemHeader = styled(Typography)`
    color: #fff;

    &>span {
      color: #2c57a9;
    }
`;

export const FooterItemDivider = styled.div`
    width: 100px;
    height: 2px;
    background: #2e5fac;
`;

export const FooterItemInfo = styled.ul`
  margin: 20px 0;
  padding: 0;
  color: #818286;
  &>li {
    list-style-type: none;
    margin: 4px 0;
  }
`;

export const HiddenFooterItemDivider = styled.div`
  width: 100px;
  height: 2px;
  background: inherit;
`;

export const HiddenTypographyColumnItemHeader = styled(Typography)`
  color: #28292b;

  &>span {
    color: #2c57a9;
  }
`;

export const FooterSocialField = styled.div`
  margin: 40px 0;
  color: #818286;
`;

export const FooterSocialIcon = styled.img`
  margin: 0 10px;
`;

export const FooterSocialGrid = styled(Grid)`
  justify-content: flex-end;

  @media (max-width: 599px) {
    justify-content: flex-start;
    padding-top: 20px;
  }
`;

export const FooterPartnerItem = styled.div`
  text-align: center;

  @media (max-width: 1279px) {
    padding: 10px 0;
  }

  @media (max-width: 599px) {
    display: flex;
  }
`;
