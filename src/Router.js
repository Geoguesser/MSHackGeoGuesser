import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Landing from "./components/Landing";
import Game from "./components/Game";
import Score from "./components/Score";
import Leaderboard from "./components/Leaderboard";

function GeoGuesserRouter({ setTotalScore, totalScore, isAuthenticated }) {
  return (
    <Router>
      <Route exact path="/" component={Landing} />
      <Route
        exact
        path="/game"
        render={routeProps =>
          isAuthenticated ? (
            <Game {...routeProps} setTotalScore={setTotalScore} totalScore={totalScore} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        exact
        path="/score"
        render={routeProps =>
          isAuthenticated ? <Score {...routeProps} totalScore={totalScore} /> : <Redirect to="/" />
        }
      />
      <Route
        exact
        path="/leaderboard"
        render={routeProps =>
          isAuthenticated ? (
            <Leaderboard {...routeProps} totalScore={totalScore} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    </Router>
  );
}

export default GeoGuesserRouter;
