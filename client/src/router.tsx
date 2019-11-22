import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Landing from "./components/Landing";
import Score from "./components/Score";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import { urlResolver } from "./utils/url-resolver";

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
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    getUser();
  }, [isAuthenticated]);

  const getUser = async () => {
    try {
      const response = await (await fetch(`${urlResolver()}/api/user`)).json();
      console.log("response", response);
      if (response.error) {
        setIsAuthenticated(false);
      } else if (response.user) {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.log("error fetching user", e);
    }
  };

  // this will prevent screens from flashing before the fetch call runs
  if (isAuthenticated === undefined) {
    return null;
  }
  return (
    <Router>
      {isAuthenticated ? (
        <>
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
        </>
      ) : (
        <Route exact path="/" component={Landing} />
      )}
    </Router>
  );
}

export default RouterComponent;
