import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import Player from "../data/models/player";
import { env } from "../enviornment";

function handleUser(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) {
  // check if user exists by their id on their google profile
  // if not then add them to the database
  Player.findOne({ where: { googleId: profile.id } })
    .then((user: any) => {
      if (user) {
        return done(undefined, user.dataValues);
      } else {
        const user = {
          username: profile.displayName,
          googleId: profile.id,
          googleDisplayName: profile.displayName,
          googleFamilyName: profile.name && profile.name.familyName,
          googleGivenName: profile.name && profile.name.givenName,
          googlePhotoUrl: profile.photos && profile.photos[0].value
        };
        Player.create(user);
        return done(undefined, user);
      }
    })
    .catch((error: any) => done(error));
}

passport.use(
  new GoogleStrategy(
    {
      clientID: env.authentication.google.clientId,
      clientSecret: env.authentication.google.clientSecret,
      callbackURL: env.authentication.google.redirectUrl // this should point to our server
    },
    handleUser
  )
);

passport.serializeUser(function(user: any, done) {
  // this is called after the above
  done(null, user.googleId);
});

passport.deserializeUser(function(googleId: string, done) {
  Player.findOne({ where: { googleId: googleId } })
    .then((user: any) => {
      done(undefined, user.dataValues);
    })
    .catch((err: any) => {
      done(err, undefined);
    });
});
