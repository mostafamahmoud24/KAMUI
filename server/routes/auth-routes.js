const router = require("express").Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const GithubStrategy = require("passport-github");
const TwitchStrategy = require("@d-fischer/passport-twitch").Strategy;
const keys = require("../config/keys");
const User = require("../models/user-model");
const colors = require("colors");

//serializing user to create a cookie using the users ID
passport.serializeUser((user, done) => {
  done(null, user.token);
});

//deserializing user to decrypt the cookie and check if the user is in our DB or not based on his ID
passport.deserializeUser((user, done) => {
  done(null, user);
});

//Check if the user is in our DB or not based on his ID
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE.clientID,
      clientSecret: keys.GOOGLE.clientSecret,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile._json.sub }).then((currentUser) => {
        if (currentUser) {
          console.log(`Current user is: ${currentUser}`.blue);
          done(null, { ...currentUser, token: accessToken });
        } else {
          new User({
            googleId: profile._json.sub,
            username: profile._json.name,
            email: profile._json.email,
            img: profile._json.picture,
          })
            .save()
            .then((newUser) => {
              console.log(`new user created: ${newUser}`.blue);
              done(null, { ...newUser, token: accessToken });
            });
        }
      });
    }
  )
);

//auth with Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

//callback route for google authentication to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  let token = req.user.token;
  // res.json({ ...req.user._doc, token: token });
  res.redirect(`http://localhost:3000?token=${token}&id=${req.user._doc._id}`);
});

//Check if the user is in our DB or not based on his ID
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.FACEBOOK.clientID,
      clientSecret: keys.FACEBOOK.clientSecret,
      callbackURL: "/auth/facebook/redirect",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      User.findOne({ facebookId: profile._json.id }).then((currentUser) => {
        if (currentUser) {
          console.log(`Current user is: ${currentUser}`.blue);
          done(null, { ...currentUser, token: accessToken });
        } else {
          new User({
            facebookId: profile._json.id,
            username: profile._json.name,
            img: profile.photos[0].value,
          })
            .save()
            .then((newUser) => {
              console.log(`new user created: ${newUser}`.blue);
              done(null, { ...newUser, token: accessToken });
            });
        }
      });
    }
  )
);

//auth with facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["profile"],
  })
);

//callback route for google authentication to redirect to
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {
    let token = req.user.token;
    // res.json({ ...req.user._doc, token: token });
    res.redirect(
      `http://localhost:3000?token=${token}&id=${req.user._doc._id}`
    );
  }
);

//Check if the user is in our DB or not based on his ID
passport.use(
  new GithubStrategy(
    {
      clientID: keys.GITHUB.clientID,
      clientSecret: keys.GITHUB.clientSecret,
      callbackURL: "/auth/github/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ githubId: profile._json.id }).then((currentUser) => {
        if (currentUser) {
          console.log(`Current user is: ${currentUser}`.blue);
          done(null, { ...currentUser, token: accessToken });
        } else {
          new User({
            githubId: profile._json.id,
            username: profile._json.name,
            email: profile._json.email,
            img: profile.photos[0].value,
          })
            .save()
            .then((newUser) => {
              console.log(`new user created: ${newUser}`.blue);
              done(null, { ...newUser, token: accessToken });
            });
        }
      });
    }
  )
);

//auth with github
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["profile", "email"],
  })
);

//callback route for google authentication to redirect to
router.get("/github/redirect", passport.authenticate("github"), (req, res) => {
  let token = req.user.token;
  // res.json({ ...req.user._doc, token: token });
  res.redirect(`http://localhost:3000?token=${token}&id=${req.user._doc._id}`);
});

//Check if the user is in our DB or not based on his ID
passport.use(
  new TwitchStrategy(
    {
      clientID: keys.TWITCH.clientID,
      clientSecret: keys.TWITCH.clientSecret,
      callbackURL: "/auth/twitch/redirect",
      scope: "user_read user:read:email",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ twitchId: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log(`Current user is: ${currentUser}`.blue);
          done(null, { ...currentUser, token: accessToken });
        } else {
          new User({
            twitchId: profile.id,
            username: profile.display_name,
            email: profile.email,
            img: profile.profile_image_url,
          })
            .save()
            .then((newUser) => {
              console.log(`new user created: ${newUser}`.blue);
              done(null, { ...newUser, token: accessToken });
            });
        }
      });
    }
  )
);

//auth with twitch
router.get("/twitch", passport.authenticate("twitch"));

//callback route for google authentication to redirect to
router.get("/twitch/redirect", passport.authenticate("twitch"), (req, res) => {
  let token = req.user.token;
  // res.json({ ...req.user._doc, token: token });
  res.redirect(`http://localhost:3000?token=${token}&id=${req.user._doc._id}`);
});

//auth logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/logout");
});

module.exports = router;
