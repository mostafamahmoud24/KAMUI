import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import animeReducer from "./anime/animeReducer";

const rootReducer = combineReducers({
  anime: animeReducer,
  user: userReducer,
});

export default rootReducer;
