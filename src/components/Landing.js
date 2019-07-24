import React from "react";
import { withRouter } from "react-router-dom";

const { REACT_APP_PLAYFAB_GAME_ID } = process.env;

class Landing extends React.Component {
  state = {
    initials: "AAA"
  };

  onChangeInitials = e => {
    this.setState({ initials: e.currentTarget.value });
  };

  loginUser = async () => {
    const { PlayFab, PlayFabClientSDK } = window;
    const { initials } = this.state;
    const loginSettings = {
      TitleId: REACT_APP_PLAYFAB_GAME_ID,
      CustomId: this.state.initials,
      CreateAccount: true
    };
    // Currently, you need to look up the correct format for this object in the API-docs:
    // https://api.playfab.com/Documentation/Client/method/LoginWithCustomID
    PlayFabClientSDK.LoginWithCustomID(loginSettings, (loginRes, loginErr) => {
      if (loginRes !== null) {
        PlayFab.settings.titleId = REACT_APP_PLAYFAB_GAME_ID;
        PlayFabClientSDK.UpdateUserTitleDisplayName({ DisplayName: initials }, res => {
          if (res) {
            document.cookie = `geoguessr_session_cookie=${res.data.SessionTicket}`;
            document.cookie = `geoguessr_initials=${initials}`;
            this.props.history.push("/game");
          }
        });
      }
    });
  };

  render() {
    const { initials } = this.state;
    return (
      <div className="landing">
        <label>
          Enter initials
          <input
            style={{ margin: "10px" }}
            type="text"
            id="customId"
            onChange={this.onChangeInitials}
            value={initials}
          />
        </label>
        <div onClick={this.loginUser} className="start-btn">
          Play Geoguesser
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
