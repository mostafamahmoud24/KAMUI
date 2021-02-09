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

export const fetchAnime = ({
  id,
  resource,
  page_limit,
  page_offset,
  sort_asc,
  sort_desc,
  filter_attribute,
  filter_value,
}) => {
  let url = `https://kitsu.io/api/edge/anime`;
  let anime_resource;

  switch (resource) {
    case "fetchTrendingAnime":
      anime_resource = (anime) => fetchTrendingAnimeSucess(anime);
      break;
    default:
      return;
  }

  if (id) {
    url = `${url}/${id}`;
  }

  if (page_limit) {
    let pageLimit = `?page%5Blimit%5D=${page_limit}`;
    url = url + pageLimit;
  }

  if (page_offset) {
    let pageOffset = `&page%5Boffset%5D=${page_offset}`;
    url = url + pageOffset;
  }

  if (sort_asc) {
    let sortAsc = `&sort=-${sort_asc}`;
    url = url + sortAsc;
  }

  if (sort_desc) {
    let sortDesc = `&sort=${sort_desc}`;
    url = url + sortDesc;
  }

  if (filter_attribute && filter_value) {
    let filter = `&filter%5B${filter_attribute}%5D=${filter_value}`;
    url = url + filter;
  }

  return (dispatch) => {
    dispatch(fetchAnimeRequest);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const anime = data;
        dispatch(anime_resource(anime));
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(fetchAnimeFailure(errorMsg));
      });
  };
};
