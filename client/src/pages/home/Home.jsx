import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import queryString from "query-string";
import "./home.css";
import { setCookie } from "../../utils/cookies";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/user/userActions";
import { fetchAnime } from "../../redux/anime/animeActions";
import CarouselBootstrap from "../../components/carousel/CarouselBootstrap";
import GlitchButton from "../../components/buttons/GlitchButton";

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
    dispatch(
      fetchAnime({
        resource: "fetchTrendingAnime",
        page_limit: "20",
        sort_desc: "ratingRank",
      })
    );
  }, [dispatch]);

  const trendingAnime = useSelector((state) => state.anime.trendingAnime);

  return (
    <div className="home-container">
      <Navbar />
      <div className="jumbotron">
        <br />
        <br />
        <h1 className="jumbotron-text mt-5">Discover New</h1>
        <h1 className="jumbotron-text">anime & Manga</h1>
        <div className="jumbotron-subtitle">
          Track your watched anime and create your own anime list
        </div>
        <div className="jumbotron-subtitle">
          choosing from a plethora of old and new anime that is updated
          regularly
        </div>
        <div className="jumbotron-cyber-button-container">
          <GlitchButton text="SEE MORE" />
        </div>
      </div>
      <div className="container-fluid trending-anime-text">
        <h2 style={{ color: "rgb(255, 255, 0)" }}>Trending Anime</h2>
      </div>
      <div className="container-fluid w-100">
        <CarouselBootstrap slides={trendingAnime.data} />
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
