import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import Player from "../data/models/player";
import { env } from "../enviornment";

const googleConfig = {
  clientID: env.authentication.google.clientId,
  clientSecret: env.authentication.google.clientSecret,
  callbackURL: env.authentication.google.redirectUrl // this should point to our server
};

function getUserFromProfile(profile: Profile) {
  return {
    username: profile.displayName,
    googleId: profile.id,
    googleDisplayName: profile.displayName,
    googleFamilyName: profile.name && profile.name.familyName,
    googleGivenName: profile.name && profile.name.givenName,
    googlePhotoUrl: profile.photos && profile.photos[0].value
  };
}

function handleUser(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
  // check if user exists by their id on their google profile
  // if not then add them to the database
  Player.findOne({ where: { googleId: profile.id } })
    .then((user: any) => {
      if (user) {
        return done(undefined, user.dataValues);
      } else {
        const user = getUserFromProfile(profile);
        Player.create(user);
        return done(undefined, user);
      }
    })
    .catch((error: any) => done(error));
}

passport.use(new GoogleStrategy(googleConfig, handleUser));

// this is called after login, and stores the `user.googId` inside of `req.session`
passport.serializeUser(function(user: any, done) {
  // this is called after the above
  done(null, user.googleId);
});

// this uses the browser's cookie and then deserializes the user from that Id
passport.deserializeUser(function(googleId: string, done) {
  Player.findOne({ where: { googleId: googleId } })
    .then((user: any) => {
      done(undefined, user.dataValues);
    })
    .catch((err: any) => {
      console.log("error finding player");
      done(err, undefined);
    });
});
