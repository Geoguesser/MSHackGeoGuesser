import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./components/Game";
import Landing from "./components/Landing";
import Score from "./components/Score";
import Leaderboard from "./components/Leaderboard";
import "./style/landing.scss";

const App = () => {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>MS Geoguesser</h1>
        </header>
        <Route exact path="/game" component={Game} />
        <Route exact path="/" component={Landing} />
        <Route exact path="/score" component={Score} />
        <Route exact path="/leaderboard" component={Leaderboard} />
      </div>
    </Router>
  );
};

export default App;
