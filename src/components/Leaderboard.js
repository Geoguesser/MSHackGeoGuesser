import React from "react";
import { Link } from "react-router-dom";
import HighScoreTable from "./HighScoreTable";
import Navbar from "./Navbar";
import "../style/leaderboard.scss";

class Leaderboard extends React.Component {
  fetchInterval = null;

  state = {
    leaderboard: null,
    loading: true
  };

  componentDidMount() {
    this.startContinousFetching();
    this.addUserScore();
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval);
  }

  startContinousFetching = () => {
    this.getLeaderboard();
    this.fetchInterval = setInterval(this.getLeaderboard, 3000);
  };

  getLeaderboard = () => {
    const { PlayFabClientSDK } = window;
    PlayFabClientSDK.GetLeaderboard({ StartPosition: 0, StatisticName: "Headshots" }, res => {
      if (res) {
        this.setState({ leaderboard: res.data.Leaderboard, loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  };

  addUserScore = () => {
    const { PlayFabClientSDK } = window;
    const { totalScore } = this.props;
    PlayFabClientSDK.UpdatePlayerStatistics({
      Statistics: [
        { StatisticName: "Headshots", Value: totalScore.reduce((sum, num) => sum + num) }
      ]
    });
  };

  render() {
    console.log(this.state);
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
            <Link to="/game">Play again?</Link>
          </div>
        </>
      );
    } else {
      return <p>error...</p>;
    }
  }
}

export default Leaderboard;
