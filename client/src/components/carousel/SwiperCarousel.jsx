import React, { useEffect, useState } from "react";
import SwiperCore, { Virtual, Controller, Zoom, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchAnime } from "../../redux/anime/animeActions";
import CardComponent from "../card/Card";

// install Virtual module
SwiperCore.use([Virtual, Controller, Zoom, Navigation]);

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchAnime({
        resource: "fetchTrendingAnime",
        page_limit: "20",
        sort_desc: "ratingRank",
      })
    );
  }, [dispatch]);

  const trendingAnime = useSelector((state) => state.anime.trendingAnime.data);

  const [controlledSwiper, setControlledSwiper] = useState(null);

  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );

  const target = vw / 8;

  return (
    <div>
      <Swiper
        spaceBetween={30}
        slidesPerView={Math.floor(vw / 240)}
        zoom={true}
        navigation={{
          prevEl: ".prev",
          nextEl: ".next",
        }}
        loop={true}
        // freeMode={true}
        slidesPerGroup={Math.floor(vw / 240) / 2}
        speed={700}
        updateOnWindowResize={true}
      >
        {trendingAnime &&
          trendingAnime.map((slideContent, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <CardComponent
                img={slideContent.attributes.posterImage.large}
                title={slideContent.attributes.canonicalTitle}
                date={slideContent.attributes.startDate.slice(0, 4)}
              />
            </SwiperSlide>
          ))}
        <div className="prev">
          <i className="fas fa-chevron-left"></i>
        </div>
        <div className="next">
          <i className="fas fa-chevron-right"></i>
        </div>
      </Swiper>
    </div>
  );
};
