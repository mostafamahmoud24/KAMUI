import React from "react";
import Carousel from "react-bootstrap/Carousel";

export default function CarouselBootstrap(props) {
  const slides = props.slides;
  console.log(slides);
  return (
    <div>
      <Carousel pause="hover" fade={true} touch={true} className="w-100">
        {slides &&
          slides.map((slide, index) => (
            <Carousel.Item key={index} interval={500}>
              <img
                className="d-block w-100 m-auto"
                src={slide.attributes.posterImage.large}
                alt={slide.attributes.canonicalTitle}
              />
              <Carousel.Caption>
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.7)",
                    width: "100%",
                    margin: "auto",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  <h3 style={{ opacity: "1" }}>{slide.attributes.titles.en}</h3>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
}
