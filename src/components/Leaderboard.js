import React from "react";
import { withRouter, Link } from "react-router-dom";
import HighScoreTable from "./HighScoreTable";
import Navbar from "./Navbar";
import { playFabLogin } from "../utils/helpers";
import { Constants } from "../utils/constants";
import "../style/leaderboard.scss";

function getUsernameCookie() {
    // eslint-disable-next-line
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
            playFabLogin(username, this.getLeaderboard.bind(0, 10));
            this.startContinousFetching();
            this.addUserScore();
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
        this.fetchInterval = setInterval(this.getLeaderboard.bind(0, 10), 3000);
    };

    getLeaderboard = (startPosition, numberOfResults) => {
        const { PlayFabClientSDK } = window;
        PlayFabClientSDK.GetLeaderboard({
            StartPosition: startPosition,
            MaxResultsCount: numberOfResults,
            StatisticName: Constants.PLAYFAB_STATISTIC_NAME
        }, res => {
            if (res) {
                this.setState({ leaderboard: res.data.Leaderboard, loading: false });
            } else {
                this.setState({ loading: false });
                console.error("error fetching leaderboard");
            }
        });
    };

    getLeaderboardAroundPlayer = () => {
        const { PlayFabClientSDK } = window;
        PlayFabClientSDK.GetLeaderboardAroundPlayer({
            PlayFabId: null,
            StatisticName: Constants.PLAYFAB_STATISTIC_NAME
        }, res => {
            if(res) {
                console.log(`it worked: ${JSON.stringify(res)}`);
            } else {
                console.error(`error fetching player's position`);
            }
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
                        <Link to="/game">Play again?</Link>
                    </div>
                </>
            );
        } else {
            return <p>error...</p>;
        }
    }
}

export default withRouter(Leaderboard);
