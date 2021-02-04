import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "./userTypes";

const initialState = {
  isLoading: false,
  user: {},
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: "",
      };

    case FETCH_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        user: {},
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
