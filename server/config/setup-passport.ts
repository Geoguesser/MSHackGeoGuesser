import passport from "passport";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
import User from "../data/models/user";

const CLIENT_ID = process.env.GOOGLE_SIGN_IN_CLIENTID || "";
const CLIENT_SECRET = process.env.GOOGLE_SIGN_IN_SECRET || "";

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/redirect" // this should point to our server
    },
    function(accessToken: any, refreshToken: any, profile: any, done: any) {
      // here is where we can create a new user or find an existing user

      // check if user exists by their id on their google profile
      // if not then add them to the database
      User.findOne({ where: { googleId: profile.id } })
        .then((user: any) => {
          if (user) {
            return done(null, user);
          } else {
            User.create({
              username: profile.displayName,
              googleId: profile.id,
              googleDisplayName: profile.displayName,
              googleFamilyName: profile.name && profile.name.familyName,
              googleGivenName: profile.name && profile.name.givenName,
              googlePhotoUrl: profile.photos && profile.photos[0].value
            });
            return done(null, profile);
          }
        })
        .catch((error: any) => done(error));
    }
  )
);

passport.serializeUser(function(user: any, done) {
  // this is called after the above
  done(null, user.id);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
