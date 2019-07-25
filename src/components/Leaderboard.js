import React from "react";
import { withRouter } from "react-router-dom";
import HighScoreTable from "./HighScoreTable";
import Navbar from "./Navbar";
import { playFabLogin } from "../utils/helpers";
import "../style/leaderboard.scss";

function getUsernameCookie() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)geoguessr_initials\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}

class Leaderboard extends React.Component {
  fetchInterval = null;

  state = {
    leaderboard: null,
    loading: true
  };

  componentDidMount() {
    // session cookie is always undefined see the TODO
    // const session = getSessionCookie();
    const username = getUsernameCookie();

    try {
      playFabLogin(username, this.getLeaderboard);
    } catch (e) {
      // if we cannot login the user, send them to main page and delete
      // history stack
      this.props.history.replace("/");
    }
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval);
  }

  startContinousFetching = () => {
    this.fetchInterval = this.setInterval(this.getLeaderboard, 3000);
  };

  getLeaderboard = () => {
    const { PlayFabClientSDK } = window;
    PlayFabClientSDK.GetLeaderboard({ StartPosition: 0, StatisticName: "Headshots" }, res => {
      if (res) {
        console.log(res);
        this.setState({ leaderboard: res.data.Leaderboard, loading: false });
      } else {
        this.setState({ loading: false });
        console.log("error fetching leaderboard");
      }
    });
  };

  render() {
    const { loading, leaderboard } = this.state;
    if (loading) {
      return <p>loading...</p>;
    } else if (leaderboard) {
      return (
        <>
          <Navbar />
          <div className="leaderboard-container">
            <h1 className="title">Leaderboard</h1>
            <HighScoreTable scores={this.state.leaderboard} />
          </div>
        </>
      );
    } else {
      return <p>error...</p>;
    }
  }
}

export default withRouter(Leaderboard);
