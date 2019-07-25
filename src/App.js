import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./components/Game";
import Landing from "./components/Landing";
import Score from "./components/Score";
import Leaderboard from "./components/Leaderboard";

const App = () => {
  return (
    <Router>
      <Route exact path="/game" component={Game} />
      <Route exact path="/" component={Landing} />
      <Route exact path="/score" component={Score} />
      <Route exact path="/leaderboard" component={Leaderboard} />
    </Router>
  );
};

export default App;
