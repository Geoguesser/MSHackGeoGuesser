import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Splash from "./pages/splash/splash";
import Menu from "./pages/menu/menu";
import Score from "./components/Score";
import Game from "./pages/game/game";
import Leaderboard from "./components/Leaderboard";
import { useAuth } from "./hooks/use-auth";

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
  const { user } = useAuth();

  return (
    <Router>
      {user ? (
        <>
          <Route exact path="/" component={Menu} />
          <Route
            exact
            path="/game"
            component={Game}
            // render={routeProps => (
            //   <Game {...routeProps} setTotalScore={setTotalScore} totalScore={totalScore} roundNumber={roundNumber} />
            // )}
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
        <Route exact path="/" component={Splash} />
      )}
    </Router>
  );
}

export default RouterComponent;
