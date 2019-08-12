import React from "react";
import { Router, Route } from "react-router-dom";
import Score from "../components/Score";
import Game from "../components/Game";
import Leaderboard from "../components/Leaderboard";
import Home from "../components/Home";

// function PrivateRoute({ component: Component, path, ...props }) {
//   if (props) {
//     return (
//       <Route
//     )
//   }
// }

function PrivateRouter({ setTotalScore, totalScore, incrementRound, currentRound }) {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/game"
        render={routeProps => (
          <Game
            {...routeProps}
            setTotalScore={setTotalScore}
            totalScore={totalScore}
            currentRound={currentRound}
          />
        )}
      />
      <Route
        exact
        path="/score"
        render={routeProps => (
          <Score
            {...routeProps}
            totalScore={totalScore}
            currentRound={currentRound}
            incrementRound={incrementRound}
          />
        )}
      />
      <Route
        exact
        path="/leaderboard"
        render={routeProps => <Leaderboard {...routeProps} totalScore={totalScore} />}
      />
    </Router>
  );
}

export default PrivateRouter;
