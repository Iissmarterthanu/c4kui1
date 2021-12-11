import React from 'react';
import { Container } from '@material-ui/core';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useStyles from './bannerStyles';
import image1 from "../../assets/banner1.png";
import image2 from "../../assets/banner2.png";
import image3 from "../../assets/banner3.png";
import image4 from "../../assets/banner4.png";
import vision from "../../assets/vision fbc.png";

const Banner = () => {
  const classes = useStyles();

  return (
    <div className="carousel-wrapper">
      {/* <Typography variant="body1" color="textPrimary"> Banner</Typography> */}

      <Container className={classes.image}>
        <Carousel width="100%" interval={5000} dynamicHeight={true} infiniteLoop useKeyboardArrows autoPlay showStatus={false} showThumbs={false} >
          <div key="vision">
            <img src={vision} alt="" />
          </div>
          <div key="image1">
            <img src={image1} alt="" />
          </div>
          <div key="image21">
            <img src={image2} alt="" />
          </div>
          <div key="image22">
            <img src={image3} alt="" />
          </div>
          <div key="image222">
            <img src={image4} alt="" />
          </div>
        </Carousel>
      </Container>

    </div>
  );
}

export default Banner