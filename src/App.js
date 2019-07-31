import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import GeoGuesserRouter from "./Router";
import { getUsernameCookie, playFabLogin } from "./utils/helpers";

class App extends React.Component {
  state = {
    totalScore: [],
    isAuthenticated: false,
    currentRound: 1
  };

  componentDidMount() {
    this.checkLoggedInUser();
  }

  checkLoggedInUser = () => {
    const username = getUsernameCookie();
    if (username) {
      try {
        playFabLogin(username, () => {
          this.setState({ isAuthenticated: true });
        });
      } catch (e) {
        this.setState({ isAuthenticated: false });
      }
    }
  };

  setTotalScore = totalScore => {
    this.setState({ totalScore });
  };

  incrementRound = () => {
    this.setState(({ currentRound }) => ({
      currentRound: currentRound + 1
    }));
  };

  render() {
    const { totalScore, isAuthenticated, currentRound } = this.state;
    return (
      <GeoGuesserRouter
        currentRound={currentRound}
        isAuthenticated={isAuthenticated}
        totalScore={totalScore}
        incrementRound={this.incrementRound}
        setTotalScore={this.setTotalScore}
      />
    );
  }
}

export default App;
