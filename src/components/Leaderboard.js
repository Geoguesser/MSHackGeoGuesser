import React from "react";
import HighScoreTable from "./HighScoreTable";
import "../style/leaderboard.scss";

class Leaderboard extends React.Component {
  refreshInterval;

  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  componentWillMount() {
    /*eslint-disable no-undef*/ /*eslint-disable no-useless-escape */
    const sessionTicket = document.cookie.replace(
      /(?:(?:^|.*;\s*)geoguessr_session_cookie\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const initials = document.cookie.replace(
      /(?:(?:^|.*;\s*)geoguessr_initials\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.setState({
      sessionTicket,
      initials
    });
    try {
      this.DoLoginCurrentUser(initials);
    } catch (exception) {
      console.error(`you probably weren't logged in: ${exception}`);
      alert("you probably were not logged it. figure it out!");
    }
  }

  componentDidMount() {
    this.getLeaderboard();
  }

  componentWillUnmount() {
    clearTimeout(this.refreshInterval);
  }

  DoLoginCurrentUser = initials => {
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
  };

  LoginCallback = (result, error) => {
    if (result !== null) {
      PlayFabClientSDK.GetLeaderboard(
        { StartPosition: 0, StatisticName: "Headshots" },
        this.updatePlayerStatistics
      );
    } else if (error !== null) {
      console.error(`something went wrong with the login request...${JSON.stringify(error)}`);
    }
  };

  updatePlayerStatistics = () => {
    PlayFabClientSDK.UpdatePlayerStatistics(
      {
        Statistics: [
          {
            StatisticName: "Headshots",
            Value: this.props.location.score > 0 ? this.props.location.score : 0
          }
        ]
      },
      this.updateStatisticsCallback
    );
  };

  updateStatisticsCallback = (result, error) => {
    if (result) {
      console.log("stats updated");
    } else if (error) {
      console.log(`failed to update stats: ${JSON.stringify(error)}`);
    }
  };

  getLeaderboard = () => {
    console.log("fetching leaderboard");
    PlayFabClientSDK.GetLeaderboard(
      { StartPosition: 0, StatisticName: "Headshots" },
      this.getLeaderboardCallback
    );
  };

  getLeaderboardCallback = (result, error) => {
    if (result) {
      this.setState({
        leaderboard: result.data.Leaderboard
      });
      this.refreshInterval = setTimeout(this.getLeaderboard.bind(this), 3000);
    } else if (error) {
      console.error(`failed to get stats: ${JSON.stringify(error)}`);
    }
  };

  getLeaderboardCallback = (result, error) => {
    if (result) {
      this.setState({
        leaderboard: result.data.Leaderboard
      });
      console.log("end getLeaderboardCallback");
    } else if (error) {
      console.error(`failed to get stats: ${JSON.stringify(error)}`);
    }
  };

  render() {
    return (
      <div className="leaderboard-container">
        <HighScoreTable scores={this.state.leaderboard} />
      </div>
    );
  }
}

export default Leaderboard;
