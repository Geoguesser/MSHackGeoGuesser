import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./components/Game";
import Landing from "./components/Landing";
import Score from "./components/Score";
import Leaderboard from "./components/Leaderboard";

const App = () => {
  const [totalScore, setTotalScore] = React.useState([]);
  const [setDistance] = React.useState(0);
  return (
    <Router>
      <Route
        exact
        path="/game"
        component={() => (
          <Game setTotalScore={setTotalScore} setDistance={setDistance} totalScore={totalScore} />
        )}
      />
      <Route exact path="/" component={Landing} />
      <Route
        exact
        path="/score"
        component={props => <Score {...props} totalScore={totalScore} />}
      />
      <Route exact path="/leaderboard" component={() => <Leaderboard totalScore={totalScore} />} />
    </Router>
  );
};

export default App;
