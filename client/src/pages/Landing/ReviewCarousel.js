import React from "react";
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {
    HeaderCarouselTypography,
    ReviewSlide,
    ReviewQuote,
    ReviewCarouselWrapper,
    ReviewCarouselInfo,
} from '../globalLandingStyles.js';



function ReviewCarousel() {
    const { t, i18n } = useTranslation();
  

    const settings = {
        dots: true,
        autoplay: true,
        arrow: false,
    };


    return (
      <div>
        <ReviewCarouselWrapper {...settings}>
            {[1].map((item) => (
                <ReviewSlide key={item} slide="ReviewSlide1.png">
                    <ReviewCarouselInfo>
                        <ReviewQuote />
                        <Typography variant="h3" gutterBottom>{t('landing.review.'+item+'.title')}</Typography>
                        <Box pb={2}>
                            <HeaderCarouselTypography variant="h5" gutterBottom>
                                {t('landing.review.'+item+'.text')}
                            </HeaderCarouselTypography>
                        </Box>
                        <Typography variant="h5">{t('landing.review.'+item+'.name')}</Typography>
                        <Box pb={2}>
                            <HeaderCarouselTypography variant="h5">{t('landing.review.'+item+'.position')}</HeaderCarouselTypography>
                        </Box>
                    </ReviewCarouselInfo>
                </ReviewSlide>
            ))}
        </ReviewCarouselWrapper>
      </div>
    );
}
  
  
  export default ReviewCarousel;