import passport from "passport";
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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
      done(null, profile);
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
