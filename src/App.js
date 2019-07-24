import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Game from "./components/Game";
import Landing from "./components/Landing";
import Score from "./components/Score";
import Leaderboard from "./components/Leaderboard";
import "./style/landing.scss";

const App = () => {
  const [score, setScore] = React.useState(0);
  const [distance, setDistance] = React.useState(0);
  return (
    <Router>
      <div className="App">
      <header>
        <Link to="/">
        <h1>MS Geoguesser</h1>
        </Link>
      </header>
        <Route exact path="/game" component={() => <Game setScore={setScore} setDistance={setDistance}/>} />
        <Route exact path="/" component={Landing} />
        <Route exact path="/score" component={Score} />
        <Route exact path="/leaderboard" component={Leaderboard} />
      </div>
    </Router>
  );
};

export default App;
