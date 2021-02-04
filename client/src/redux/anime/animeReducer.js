import {
  FETCH_ANIME_REQUEST,
  FETCH_TRENDING_ANIME_SUCCESS,
  FETCH_ANIME_FAILURE,
} from "./animeTypes";

const initialState = {
  isLoading: false,
  trendingAnime: [],
  error: "",
};

const animeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ANIME_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_TRENDING_ANIME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        trendingAnime: action.payload,
        error: "",
      };

    case FETCH_ANIME_FAILURE:
      return {
        ...state,
        isLoading: false,
        trendingAnime: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default animeReducer;
