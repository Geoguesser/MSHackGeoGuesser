import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
var GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();
const port = process.env.PORT || 5000;

const googleClientID = process.env.GOOGLE_SIGN_IN_CLIENTID || "";
const googleSecret = process.env.GOOGLE_SIGN_IN_SECRET || "";
console.log(googleClientID);
console.log(googleSecret);

export function initialize() {
  // initalize passport
  app.use(passport.initialize());
  // deserialize cookie from the browser
  app.use(passport.session());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Use the GoogleStrategy within Passport.
  //   Strategies in passport require a `verify` function, which accept
  //   credentials (in this case, a token, tokenSecret, and Google profile), and
  //   invoke a callback with a user object.
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleSecret,
        callbackURL: "http://localhost:5000/auth/google/redirect"
      },
      function(accessToken: any, refreshToken: any, profile: any, done: any) {
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        console.log("profile", profile);
        done(null, profile);
      }
    )
  );

  passport.serializeUser(function(user: any, done) {
    console.log("serialize", user);
    done(null, user.id);
  });

  passport.deserializeUser(function(user, done) {
    console.log("deserialize");
    done(null, user);
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile"] }, function() {
      console.log("AUTHENTICATE!Q?!?!?!?");
    })
  );

  app.get("/login/failed", (req, res) => {
    console.log("LOGIN FAILED");
    res.status(401).json({
      success: false,
      message: "user failed to authenticate."
    });
  });

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get(
    "/auth/google/redirect",
    function(req, res, next) {
      console.log("auth/google/redirect!!!!!!");
      next();
    },
    passport.authenticate("google", {
      failureRedirect: "/login/failed",
      successRedirect: "http://localhost:3000"
    })
  );

  app.get("/login", function(req, res) {
    console.log("/LOGIN wasssssup");
    res.render("login");
  });

  app.get("/api", (req, res) => {
    res.send({ express: "Hello from express" });
  });

  app.listen(port, () => console.log("listening on port " + port));
}
