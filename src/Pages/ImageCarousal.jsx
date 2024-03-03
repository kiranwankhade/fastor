import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import "../Style/ImageCarousal.css"
import { Box } from '@chakra-ui/react';


function ImageCarousal({data}) {


  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,  
    autoplay: true, // Autoplay enabled
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (

    <Box className="imageCarousal" p={2} w={['80%','90%','90%','80%']}>
      <Slider {...settings} >
              {data.map((item,index) => (
                  <Box key={index} className="imgcard">
                    <Box className="imgcard-top">
                      <img
                        src={
                           item
                        }
                        alt="images"
                      />
                    </Box>
                    
                    </Box>
                ))}


      </Slider>
    </Box>
  );
}

export default ImageCarousal;