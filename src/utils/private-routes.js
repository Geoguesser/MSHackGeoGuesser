import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Score from "../components/Score";
import Game from "../components/Game";
import Leaderboard from "../components/Leaderboard";
import Welcome from "../components/Welcome";
import Landing from "../components/Landing";

function PrivateRouter({ setTotalScore, totalScore, setRoundNumber, roundNumber }) {
  console.log("inside!");
  return (
    <Router>
      <Route
        exact
        path="/"
        render={routeProps => (
          <Landing>
            <Welcome {...routeProps} />
          </Landing>
        )}
      />
      <Route
        exact
        path="/game"
        render={routeProps => (
          <Game
            {...routeProps}
            setTotalScore={setTotalScore}
            totalScore={totalScore}
            currentRound={roundNumber}
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
            currentRound={roundNumber}
            incrementRound={setRoundNumber}
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
