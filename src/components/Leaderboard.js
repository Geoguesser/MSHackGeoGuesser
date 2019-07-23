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
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    initialize = () => {
    };

    DoLoginCurrentUser = () => {
        /*eslint-disable no-undef*/
        PlayFab.settings.titleId = process.env.REACT_APP_PLAYFAB_GAME_ID;
        var loginRequest = {
            // Currently, you need to look up the correct format for this object in the API-docs:
            // https://api.playfab.com/Documentation/Client/method/LoginWithCustomID
            TitleId: PlayFab.settings.titleId,
            CustomId: document.getElementById("customId").value,
            CreateAccount: true
        };

        PlayFabClientSDK.LoginWithCustomID(loginRequest, this.LoginCallback);
    }

    LoginCallback = (result, error) => {
        if (result !== null) {
            PlayFabClientSDK.UpdateUserTitleDisplayName({ DisplayName: document.getElementById("customId").value }, this.updateUserDisplayNameCallback);
            PlayFabClientSDK.UpdatePlayerStatistics({
                Statistics: [{
                    "StatisticName": "Headshots",
                    "Value": document.getElementById("highScore").value
                }]
            }, this.updateStatisticsCallback);
        } else if (error !== null) {
            console.error(`something went wrong with the login request...${JSON.stringify(error)}`);
        }
    }

    updateUserDisplayNameCallback = (result, error) => {
        if (result !== null) {
            PlayFabClientSDK.UpdatePlayerStatistics({
                Statistics: [{
                    "StatisticName": "Headshots",
                    "Value": 47
                }]
            }, this.updateStatisticsCallback);
        } else if (error !== null) {
            console.error(`something went wrong with the login request...${JSON.stringify(error)}`);
        }
    };

    updateStatisticsCallback = (result, error) => {
        if (result) {
            PlayFabClientSDK.GetLeaderboard({ StartPosition: 0, StatisticName: 'Headshots' }, this.getLeaderboardCallback);
        } else if (error) {
            console.log(`failed to update stats: ${JSON.stringify(error)}`);
        }
        console.log('ended updateStatisticsCallback');
    };

    getLeaderboardCallback = (result, error) => {
        if (result) {
            this.setState({
                leaderboard: result.data.Leaderboard
            });
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
            <input style={{margin: '10px'}} type="text" id="customId" defaultValue="AAA" /><br />
            <input style={{margin: '10px'}} type="number" id="highScore" defaultValue="42" /><br />
            <input style={{margin: '10px'}} type="button" value="Login/Update High Score/Get Leaderboard" onClick={this.DoLoginCurrentUser} /><br />
            <br />
            <HighScoreTable scores={this.state.leaderboard} />
        </div>);
    }
}

export default Leaderboard;
