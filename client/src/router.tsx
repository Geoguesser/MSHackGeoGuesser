import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Score from "./components/Score";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import { AuthenticationContext } from "./components/AuthProvider";

interface RouterComponentProps {
  setTotalScore: React.Dispatch<React.SetStateAction<number[]>>;
  setRoundNumber: React.Dispatch<React.SetStateAction<number>>;
  totalScore: number[];
  roundNumber: number;
}

function RouterComponent({
  setTotalScore,
  setRoundNumber,
  totalScore,
  roundNumber
}: RouterComponentProps): JSX.Element | null {
  const { isAuthenticated } = React.useContext(AuthenticationContext);
  return (
    <Router>
      {isAuthenticated ? (
        <>
          <Route exact path="/" component={Home} />
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
        </>
      ) : (
        <Route exact path="/" component={Landing} />
      )}
    </Router>
  );
}

export default RouterComponent;
