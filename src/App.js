import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./components/Game";
import Landing from "./components/Landing";
import Score from "./components/Score";
import Leaderboard from "./components/Leaderboard";

class App extends React.Component {
  state = {
    totalScore: [],
    distance: 0
  };

  setTotalScore = totalScore => {
    this.setState({ totalScore });
  };

  setDistance = distance => {
    this.setState({ distance });
  };

  render() {
    const { totalScore, distance } = this.state;
    return (
      <Router>
        <Route
          exact
          path="/game"
          component={() => (
            <Game
              setTotalScore={this.setTotalScore}
              setDistance={this.setDistance}
              totalScore={totalScore}
            />
          )}
        />
        <Route exact path="/" component={Landing} />
        <Route
          exact
          path="/score"
          component={props => <Score {...props} totalScore={totalScore} />}
        />
        <Route
          exact
          path="/leaderboard"
          component={() => <Leaderboard totalScore={totalScore} />}
        />
      </Router>
    );
  }
}

export default App;
