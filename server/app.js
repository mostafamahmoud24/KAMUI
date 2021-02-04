const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const colors = require("colors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//creating a session using a cookie via the cookie-session dependency
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //this sets the cookie expiry duration in milliseconds, the equation represents a 24hr period before the cookie expires
    keys: [keys.cookie.key],
  })
);

//initializing passport to start a session on login
app.use(passport.initialize());
app.use(passport.session());

//connect to mongoDB
mongoose
  .connect(keys.mongoDB.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to mongoDB".brightYellow);
  });

//defining routes
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
