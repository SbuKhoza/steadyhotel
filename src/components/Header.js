import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Box, Typography } from '@mui/material'; 
import { Pagination, Autoplay } from 'swiper/modules';
import '@fontsource/righteous'; 

function Header() {
  const images = [
    { src: 'images/banner.jpg', text: 'Book a Steady & Enjoy Your Stay' }
  ];

  return (
    <Box 
      sx={{ 
        width: '100%', 
        height: '100vh',  
        position: 'relative',
        overflow: 'hidden' 
      }}
    >
      <Swiper
        spaceBetween={40}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={img.src}
                alt={`Slide ${index + 1}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: 'scale(1.1)',
                  transition: 'transform 10s ease',
                }}
                onLoad={(e) => e.target.style.transform = 'scale(1)'}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '40%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  textAlign: 'center',
                  padding: '20px',
                  borderRadius: '10px',
                  zIndex: 2,
                }}
              >
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontFamily: 'Righteous', 
                    fontSize: '3.5rem',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 10px rgba(0, 0, 0, 0.7)', 
                  }}
                >
                  {img.text}
                </Typography>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',  
                  zIndex: 1,
                }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default Header;