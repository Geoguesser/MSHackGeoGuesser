import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import GeoGuesserRouter from "./Router";
import { getUsernameCookie, playFabLogin } from "./utils/helpers";

class App extends React.Component {
  state = {
    totalScore: [],
    isAuthenticated: false
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

  render() {
    const { totalScore, isAuthenticated } = this.state;
    return (
      <GeoGuesserRouter
        isAuthenticated={isAuthenticated}
        totalScore={totalScore}
        setTotalScore={this.setTotalScore}
      />
    );
  }
}

export default App;
