import React from "react";
import { Link } from "react-router-dom";
import HighScoreTable from "./HighScoreTable";
import Navbar from "./Navbar";
import { playFabLogin, getUsernameCookie, getPlayFabIdCookie } from "../utils/helpers";
import { Constants } from "../utils/constants";
import "../style/leaderboard.scss";

class Leaderboard extends React.Component {
    fetchInterval = null;
    username = null;

    state = {
        leaderboard: null,
        currentUserScore: null,
        leaderboardLoading: true,
        currentUserScoreLoading: true,
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
        this.fetchInterval = setInterval(this.fetchLeaderboards, 3000);
    };

    fetchLeaderboards = () => {
        this.getLeaderboard(0, 10);
        this.getLeaderboardAroundPlayer();
    }

    getLeaderboard = (startPosition, numberOfResults) => {
        const { PlayFabClientSDK } = window;
        PlayFabClientSDK.GetLeaderboard({
            StartPosition: startPosition,
            MaxResultsCount: numberOfResults,
            StatisticName: Constants.PLAYFAB_STATISTIC_NAME
        }, res => {
            if (res) {
                this.setState({
                    leaderboard: res.data.Leaderboard,
                });
            } else {
                console.error("error fetching leaderboard");
            }
            this.setState({
                leaderboardLoading: false,
                loading: false || this.state.currentUserScoreLoading
            })
        });
    };

    getLeaderboardAroundPlayer = () => {
        const { PlayFabClientSDK } = window;
        const currentUserPlayFabId = getPlayFabIdCookie();
        PlayFabClientSDK.GetLeaderboardAroundPlayer({
            PlayFabId: currentUserPlayFabId,
            StatisticName: Constants.PLAYFAB_STATISTIC_NAME
        }, (res, err) => {
            if(res) {
                const currentUserScore = res.data.Leaderboard.find(p => p.PlayFabId === currentUserPlayFabId);
                if(currentUserScore.Position > 10) {
                    this.setState({
                        currentUserScore
                    });
                } else {
                    // we're in the top 10, render scoreboard like normal
                }
            } else if (err) {
                console.error(`error fetching player's position: ${err}`);
            } else {
                console.error(`unknown error happened fetching leaderboard around player`);
            }
            this.setState({
                currentUserScoreLoading: false,
                loading: false || this.state.leaderboardLoading
            })
        })
    }

    addUserScore = () => {
        const { PlayFabClientSDK } = window;
        const { totalScore } = this.props;
        PlayFabClientSDK.UpdatePlayerStatistics({
            Statistics: [
                { StatisticName: Constants.PLAYFAB_STATISTIC_NAME, Value: totalScore.reduce((sum, num) => sum + num) }
            ]
        });
    };

    getUsername() {
        if(!this.username) {
            this.username = getUsernameCookie();
        }
        return this.username;
    }

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
                        <HighScoreTable scores={this.state.leaderboard} currentUserScore={this.state.currentUserScore} />
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
