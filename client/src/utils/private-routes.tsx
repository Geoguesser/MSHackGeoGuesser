import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Score from "../components/Score";
import Game from "../components/Game";
import Leaderboard from "../components/Leaderboard";

interface PrivateRouterProps {
  setTotalScore: React.Dispatch<React.SetStateAction<number[]>>;
  setRoundNumber: React.Dispatch<React.SetStateAction<number>>;
  totalScore: number[];
  roundNumber: number;
}

function PrivateRouter({
  setTotalScore,
  totalScore,
  setRoundNumber,
  roundNumber
}: PrivateRouterProps): JSX.Element {
  return (
    <Router>
      <Route exact path="/" render={() => <Redirect to="/game" />} />
      <Route
        exact
        path="/game"
        render={routeProps => (
          <Game
            {...routeProps}
            setTotalScore={setTotalScore}
            totalScore={totalScore}
            roundNumber={roundNumber}
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
            roundNumber={roundNumber}
            setRoundNumber={setRoundNumber}
          />
        )}
      />
      <Route
        exact
        path="/leaderboard"
        render={routeProps => (
          <Leaderboard
            {...routeProps}
            totalScore={totalScore}
            setTotalScore={setTotalScore}
            setRoundNumber={setRoundNumber}
          />
        )}
      />
    </Router>
  );
}

export default PrivateRouter;
