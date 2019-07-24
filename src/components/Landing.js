import React from "react";
import { withRouter } from "react-router-dom";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowPlayLink: false
    };
    this.gameLink = React.createRef();
  }

  render = () => {
    return (
      <div className="landing">
        <div>
        <text>
          User Name
        </text>
        <input style={{ margin: '10px' }} type="text" id="customId" defaultValue="AAA" />
        </div>
          <div onClick={this.DoLoginCurrentUser} className="start-btn">Play Geoguesser</div>
      </div>
    );
  }

  gameLink (e) {
    e.target.click();
  }

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
    } else if (error !== null) {
      console.error(`something went wrong with the login request...${JSON.stringify(error)}`);
    }
  }

  updateUserDisplayNameCallback = (result, error) => {
    if (result !== null) {
      console.log(`display name updated: ${JSON.stringify(result)}`);
      this.setState({
        shouldShowPlayLink: true
      });
      document.cookie = `geoguessr_session_cookie=${result.data.SessionTicket}`;
      document.cookie = `geoguessr_initials=${document.getElementById("customId").value}`;
      this.props.history.push({
        pathname: "/game",
      });
    } else if (error !== null) {
      console.error(`something went wrong with the login request...${JSON.stringify(error)}`);
    }
  };
};



export default withRouter(Landing);
