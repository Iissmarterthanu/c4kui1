import * as React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ShopImageList( {images} ) {
  return (
    <Carousel width="100%" interval={5000} dynamicHeight={true} infiniteLoop useKeyboardArrows autoPlay showStatus={false} showThumbs={false} >
      {images.map((image) => (
        <img src={image} alt="" />
      ))}
    </Carousel>
  );
}

