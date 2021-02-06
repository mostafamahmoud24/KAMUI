import {
  FETCH_ANIME_REQUEST,
  FETCH_TRENDING_ANIME_SUCCESS,
  FETCH_ANIME_FAILURE,
} from "./animeTypes";

export const fetchAnimeRequest = () => {
  return {
    type: FETCH_ANIME_REQUEST,
  };
};

export const fetchTrendingAnimeSucess = (trending_anime) => {
  return {
    type: FETCH_TRENDING_ANIME_SUCCESS,
    payload: trending_anime,
  };
};

export const fetchAnimeFailure = (error) => {
  return {
    type: FETCH_ANIME_FAILURE,
    payload: error,
  };
};

export const fetchTrendingAnime = () => {
  return (dispatch) => {
    dispatch(fetchAnimeRequest);
    fetch(`https://kitsu.io/api/edge/anime?page%5Blimit%5D=20&sort=ratingRank`)
      .then((res) => res.json())
      .then((data) => {
        const trending_anime = data;
        dispatch(fetchTrendingAnimeSucess(trending_anime));
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(fetchAnimeFailure(errorMsg));
      });
  };
};
