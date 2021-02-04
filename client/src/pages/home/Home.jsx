import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import queryString from "query-string";
import "./home.css";
import { setCookie } from "../../utils/cookies";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/user/userActions";
import { fetchTrendingAnime } from "../../redux/anime/animeActions";
import CarouselBootstrap from "../../components/carousel/CarouselBootstrap";

export default function Home(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    let query = queryString.parse(props.location.search);
    if (query.token) {
      setCookie("jwt", query.token, 15);
      setCookie("id", query.id, 15);
      dispatch(fetchUsers());
      props.history.push("/");
    }
  }, [props.location.search, props.history, dispatch]);

  useEffect(() => {
    dispatch(fetchTrendingAnime());
  }, [dispatch]);

  const trendingAnime = useSelector((state) => state.anime.trendingAnime);

  console.log(trendingAnime.data);

  return (
    <div className="home-container">
      <Navbar />
      <br />
      <br />
      <div className="jumbotron">
        <h1 className="jumbotron-text">Discover New</h1>
        <h1 className="jumbotron-text">anime & Manga</h1>
        <div className="jumbotron-subtitle">
          Track your watched anime and create your own anime list
        </div>
        <div className="jumbotron-subtitle">
          choosing from a plethora of old and new anime that is updated
          regularly
        </div>
        <a href="#see-more" className="jumbotron-link">
          <div className="jumbotron-button">
            <div className="arrow-text">See more</div>
            <i className="fa fa-angle-down" aria-hidden="true"></i>
          </div>
        </a>
      </div>
      <br />
      <div className="container-fluid w-75">
        <div className="row">
          <div className="col-7"></div>
          <div className="col-5">
            <CarouselBootstrap slides={trendingAnime.data} />
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
