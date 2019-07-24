import React from "react";
import HighScoreTable from './HighScoreTable';
import '../style/leaderboard.scss';

class Leaderboard extends React.Component {
    constructor() {
        super();
        this.state = {
            leaderboard: []
        };
    }

    componentWillMount() {
        /*eslint-disable no-undef*/ /*eslint-disable no-useless-escape */
        const sessionTicket = document.cookie.replace(/(?:(?:^|.*;\s*)geoguessr_session_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const initials = document.cookie.replace(/(?:(?:^|.*;\s*)geoguessr_initials\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        this.setState({
            sessionTicket,
            initials
        });
        try {
            this.DoLoginCurrentUser(initials);
        } catch (exception) {
            console.error(`you probably weren't logged in: ${exception}`);
            alert('you probably were not logged it. figure it out!');
        }
    }

    DoLoginCurrentUser = (initials) => {
        /*eslint-disable no-undef*/
        PlayFab.settings.titleId = process.env.REACT_APP_PLAYFAB_GAME_ID;
        const loginRequest = {
            // Currently, you need to look up the correct format for this object in the API-docs:
            // https://api.playfab.com/Documentation/Client/method/LoginWithCustomID
            TitleId: PlayFab.settings.titleId,
            CustomId: initials,
            CreateAccount: false
        };
        PlayFabClientSDK.LoginWithCustomID(loginRequest, this.LoginCallback);
    }

    LoginCallback = (result, error) => {
        if (result !== null) {
            PlayFabClientSDK.GetLeaderboard({ StartPosition: 0, StatisticName: 'Headshots' }, this.getLeaderboardCallback);
        } else if (error !== null) {
            console.error(`something went wrong with the login request...${JSON.stringify(error)}`);
        }
    }

    updatePlayerStatistics = () => {
        PlayFabClientSDK.UpdatePlayerStatistics({
            Statistics: [{
                "StatisticName": "Headshots",
                "Value": document.getElementById("highScore").value
            }]
        }, this.updateStatisticsCallback);
    };

    updateStatisticsCallback = (result, error) => {
        if (result) {
            setTimeout(this.getLeaderboard, 500);
        } else if (error) {
            console.log(`failed to update stats: ${JSON.stringify(error)}`);
        }
    };

    getLeaderboard = () => {
        PlayFabClientSDK.GetLeaderboard({ StartPosition: 0, StatisticName: 'Headshots' }, this.getLeaderboardCallback);
    }

    getLeaderboardCallback = (result, error) => {
        if (result) {
            this.setState({
                leaderboard: result.data.Leaderboard
            });
            console.log('end getLeaderboardCallback');
        } else if (error) {
            console.error(`failed to get stats: ${JSON.stringify(error)}`);
        }
    };

    // This is a utility function we haven't put into the core SDK yet.  Feel free to use it.
    CompileErrorReport = (error) => {
        if (error === null)
            return "";
        var fullErrors = error.errorMessage;
        for (var paramName in error.errorDetails)
            for (var msgIdx in error.errorDetails[paramName])
                fullErrors += "\n" + paramName + ": " + error.errorDetails[paramName][msgIdx];
        return fullErrors;
    }

    render() {
        return (<div className="leaderboard-container">
            <input style={{ margin: '10px' }} type="number" id="highScore" defaultValue="42" /><br />
            <input style={{ margin: '10px' }} type="button" value="Update High Score/Get Leaderboard" onClick={this.updatePlayerStatistics} /><br />
            <br />
            <HighScoreTable scores={this.state.leaderboard} />
        </div>);
    }
}

export default Leaderboard;
