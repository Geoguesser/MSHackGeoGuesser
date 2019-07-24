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
        /*eslint-disable no-undef*/
        PlayFabClientSDK.GetLeaderboard({ StartPosition: 0, StatisticName: 'Headshots' }, this.getLeaderboardCallback);
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
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
            <input style={{ margin: '10px' }} type="number" id="highScore" defaultValue="42" /><br />
            <input style={{ margin: '10px' }} type="button" value="Update High Score/Get Leaderboard" onClick={this.updatePlayerStatistics} /><br />
            <br />
            <HighScoreTable scores={this.state.leaderboard} />
        </div>);
    }
}

export default Leaderboard;
