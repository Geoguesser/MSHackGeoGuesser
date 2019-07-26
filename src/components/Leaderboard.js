import React from "react";
import { withRouter, Link } from "react-router-dom";
import HighScoreTable from "./HighScoreTable";
import Navbar from "./Navbar";
import { playFabLogin, getUsernameCookie } from "../utils/helpers";
import { Constants } from "../utils/constants";
import "../style/leaderboard.scss";

class Leaderboard extends React.Component {
    fetchInterval = null;
    username = null;

    state = {
        leaderboard: null,
        loading: true
    };

    componentDidMount() {
        // session cookie is always undefined see the TODO
        // const session = getSessionCookie();

        try {
            playFabLogin(this.getUsername(), this.getLeaderboard.bind(0, 10));
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
                this.getLeaderboardAroundPlayer();
            } else {
                this.setState({ loading: false });
                console.error("error fetching leaderboard");
            }
        });
    };

    getLeaderboardAroundPlayer = () => {
        const { PlayFabClientSDK } = window;
        // geoguessr_playfabid_cookie
        // retrieve from cookie and use to find the current user
        PlayFabClientSDK.GetLeaderboardAroundPlayer({
            PlayFabId: '', // todo(kfcampbell): get from cookie
            StatisticName: Constants.PLAYFAB_STATISTIC_NAME
        }, (res, err) => {
            if(res) {
                console.log(`it worked: ${JSON.stringify(res)}`);

            } else if (err) {
                console.error(`error fetching player's position: ${err}`);
            } else {
                console.error(`unknown error happened fetching leaderboard around player`);
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
