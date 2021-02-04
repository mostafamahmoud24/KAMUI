const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  githubId: String,
  twitchId: String,
  username: String,
  email: String,
  img: String,
  anime_list_id: Array,
  anime_watched_id: Array,
  anime_liked_id: Array,
  manga_list_id: Array,
  manga_watched_id: Array,
  manga_liked_id: Array,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
