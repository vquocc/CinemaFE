import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  return (
    <Slider {...settings} className="banner-slider" style={{ marginBottom: 48 }}>
      {images.map((img, index) => (
        <div key={index} style={{ position: 'relative' }}>
          <img
            src={img}
            alt={`banner-${index}`}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: 400,
              objectFit: 'cover',
            }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default BannerSlider;
