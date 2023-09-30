import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import newTravel2 from "../assets/newTravel2.jpg";
import newTravel3 from "../assets/newTravel3.jpg";
import newTravel4 from "../assets/newTravel4.jpg";
import newTravel6 from "../assets/newTravel6.jpg";
import "../styles/ImageSlider.css";

const slideImages = [
  {
    url: newTravel2,
    caption: "img1",
  },
  {
    url: newTravel3,
    caption: "img2",
  },
  {
    url: newTravel4,
    caption: "img3",
  },
  {
    url: newTravel6,
    caption: "img4",
  },
];

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "650px",
  backgroundSize: "cover",
};

const ImageSlider = () => {
  return (
    <div className="slide-container">
      <Slide
        indicators={true} // Remove the indicators (dots)
        arrows={false} // Remove the arrow navigation
      >
        {slideImages.map((image, index) => (
          <div
            className="imageSlider"
            key={index}
            style={{ ...divStyle, backgroundImage: `url(${image.url})` }}
          >
            {/* <span>{image.caption}</span> */}
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default ImageSlider;
