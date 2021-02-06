import React from "react";
import Carousel from "react-bootstrap/Carousel";
import CardComponent from "../card/Card";
import "./carouselComponent.css";

export default function CarouselBootstrap(props) {
  const slides = props.slides;
  return (
    <div>
      {slides && (
        <div>
          <Carousel
            pause="hover"
            touch={true}
            className="w-100"
            wrap={true}
            indicators={false}
            prevIcon={
              <i className="fas fa-chevron-left fa-2x carousel-control-icon"></i>
            }
            nextIcon={
              <i className="fas fa-chevron-right fa-2x carousel-control-icon"></i>
            }
            interval={null}
          >
            <Carousel.Item>
              <div className="d-flex container-fluid cardComponent pt-5 pb-5">
                {slides.slice(0, 7).map((slide, index) => (
                  <a href="#" className="cardHover" key={index}>
                    <CardComponent
                      key={index}
                      img={slide.attributes.posterImage.large}
                      title={slide.attributes.canonicalTitle}
                      date={slide.attributes.startDate.slice(0, 4)}
                    />
                  </a>
                ))}
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-flex container-fluid cardComponent pt-5 pb-5">
                {slides.slice(7, 14).map((slide, index) => (
                  <a href="#" className="cardHover" key={index}>
                    <CardComponent
                      key={index}
                      img={slide.attributes.posterImage.large}
                      title={slide.attributes.canonicalTitle}
                      date={slide.attributes.startDate.slice(0, 4)}
                    />
                  </a>
                ))}
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-flex container-fluid cardComponent pt-5 pb-5">
                {slides.slice(14, 20).map((slide, index) => (
                  <a href="#" className="cardHover" key={index}>
                    <CardComponent
                      key={index}
                      img={slide.attributes.posterImage.large}
                      title={slide.attributes.canonicalTitle}
                      date={slide.attributes.startDate.slice(0, 4)}
                    />
                  </a>
                ))}
                <a href="#" className="cardHover">
                  <CardComponent
                    img={slides[0].attributes.posterImage.large}
                    title={slides[0].attributes.canonicalTitle}
                    date={slides[0].attributes.startDate.slice(0, 4)}
                  />
                </a>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      )}
    </div>
  );
}
