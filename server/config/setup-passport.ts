import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import User from "../data/models/user";
import { env } from "../enviornment";

function handleUser(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) {
  // check if user exists by their id on their google profile
  // if not then add them to the database
  console.log("HANDLING THE USER");
  User.findOne({ where: { googleId: profile.id } })
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
        User.create(user);
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
  console.log("SERIALIZING THE USER", user);
  done(null, user.googleId);
});

passport.deserializeUser(function(googleId: string, done) {
  console.log("DESERIALIZING THE USER");
  User.findOne({ where: { googleId: googleId } })
    .then((user: any) => {
      done(undefined, user.dataValues);
    })
    .catch((err: any) => {
      done(err, undefined);
    });
});
