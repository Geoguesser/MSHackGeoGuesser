import React from "react";
import '../style/leaderboard.scss';

class Leaderboard extends React.Component {
    componentDidMount() {
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
        console.log(`title id: ${process.env.REACT_APP_PLAYFAB_GAME_ID}`);
        console.dir(process.env);
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
            console.log(`login callback succeeded: ${JSON.stringify(result)}`);
            PlayFabClientSDK.UpdateUserTitleDisplayName({ DisplayName: document.getElementById("customId").value }, this.updateUserDisplayNameCallback);
            PlayFabClientSDK.UpdatePlayerStatistics({
                Statistics: [{
                    "StatisticName": "Headshots",
                    "Value": document.getElementById("highScore").value
                }]
            }, this.updateStatisticsCallback);
        } else if (error !== null) {
            console.log(`something went wrong with the login request...${JSON.stringify(error)}`);
        }
    }

    updateUserDisplayNameCallback = (result, error) => {
        if (result !== null) {
            console.log(`update display name callback succeeded: ${JSON.stringify(result)}`);
            PlayFabClientSDK.UpdatePlayerStatistics({
                Statistics: [{
                    "StatisticName": "Headshots",
                    "Value": 47
                }]
            }, this.updateStatisticsCallback);
        } else if (error !== null) {
            console.log(`something went wrong with the login request...${JSON.stringify(error)}`);
        }
    };

    updateStatisticsCallback = (result, error) => {
        if (result) {
            console.log(`successfully updated stats: ${JSON.stringify(result)}`);
            PlayFabClientSDK.GetLeaderboard({ StartPosition: 0, StatisticName: 'Headshots' }, this.getLeaderboardCallback);
        } else if (error) {
            console.log(`failed to update stats: ${JSON.stringify(error)}`);
        }
        console.log('ended updateStatisticsCallback');
    };

    getLeaderboardCallback = (result, error) => {
        if (result) {
            console.log(`successfully got stats: ${JSON.stringify(result)}`);
        } else if (error) {
            console.log(`failed to get stats: ${JSON.stringify(error)}`);
        }
        console.log('ended getLeaderboardCallback');
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
            DisplayName: <input type="text" id="customId" defaultValue="Input your initials here." /><br />
            Your High Score: <input type="number" id="highScore" defaultValue="42" /><br />
            <input type="button" value="Login/Update High Score/Get Leaderboard" onClick={this.DoLoginCurrentUser} /><br />
            Result:<br />
        </div>);
    }
}

export default Leaderboard;
