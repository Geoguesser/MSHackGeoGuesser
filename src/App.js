import "./style/landing.scss";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import Streetview from "./components/Streetview";
import marker from "./assets/placeholder.png";

const Marker = () => {
  return (
    <div>
      <img src={marker} alt="" />
    </div>
  );
};

const Game = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  return (
    <div
      style={{
        height: "400px",
        width: "400px",
        position: "absolute",
        bottom: 0,
        right: 0
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
        defaultCenter={{
          lat: 47.658427,
          lng: -122.141433
        }}
        onClick={e => {
          setLat(e.lat);
          setLng(e.lng);
        }}
        defaultZoom={0}
        yesIWantToUseGoogleMapApiInternals
      >
        {lat ? <Marker lat={lat} lng={lng} /> : null}
      </GoogleMapReact>
    </div>
  );
};

const Landing = () => {
  return (
    <div className="landing">
      <header>
        <h1>MS Geoguesser</h1>
      </header>
      <Link className="start-btn" to="/game">
        Play Geoguesser
      </Link>
      <div>
        PlayFab Getting Started Guide<br />
        DisplayName: <input type="text" id="customId" defaultValue="Input your initials here." /><br />
        High Score: <input type="number" id="highScore" defaultValue="42" /><br />
        <input type="button" value="Login/Update High Score/Get Leaderboard" onClick={DoExampleLoginWithCustomID} /><br />
        Result:<br />
        <textarea id="resultOutput" cols="60" rows="5"></textarea><br />
      </div>
    </div>
  );
};

const DoExampleLoginWithCustomID = () => {
  /*eslint-disable no-undef*/
  PlayFab.settings.titleId = process.env.PLAYFAB_GAME_ID;
  var loginRequest = {
    // Currently, you need to look up the correct format for this object in the API-docs:
    // https://api.playfab.com/Documentation/Client/method/LoginWithCustomID
    TitleId: PlayFab.settings.titleId,
    CustomId: document.getElementById("customId").value,
    CreateAccount: true
  };

  PlayFabClientSDK.LoginWithCustomID(loginRequest, LoginCallback);
}

const LoginCallback = (result, error) => {
  if (result !== null) {
    console.log(`login callback succeeded: ${JSON.stringify(result)}`);
    PlayFabClientSDK.UpdateUserTitleDisplayName({ DisplayName: document.getElementById("customId").value }, updateUserDisplayNameCallback);
    PlayFabClientSDK.UpdatePlayerStatistics({
      Statistics: [{
        "StatisticName": "Headshots",
        "Value": document.getElementById("highScore").value
      }]
    }, updateStatisticsCallback);
  } else if (error !== null) {
    console.log(`something went wrong with the login request...${JSON.stringify(error)}`);
  }
}

const updateUserDisplayNameCallback = (result, error) => {
  if (result !== null) {
    console.log(`update display name callback succeeded: ${JSON.stringify(result)}`);
    PlayFabClientSDK.UpdatePlayerStatistics({
      Statistics: [{
        "StatisticName": "Headshots",
        "Value": 47
      }]
    }, updateStatisticsCallback);
  } else if (error !== null) {
    console.log(`something went wrong with the login request...${JSON.stringify(error)}`);
  }
};

const updateStatisticsCallback = (result, error) => {
  if (result) {
    console.log(`successfully updated stats: ${JSON.stringify(result)}`);
    PlayFabClientSDK.GetLeaderboard({ StartPosition: 0, StatisticName: 'Headshots' }, getLeaderboardCallback);
  } else if (error) {
    console.log(`failed to update stats: ${JSON.stringify(error)}`);
  }
  console.log('ended updateStatisticsCallback');
};

const getLeaderboardCallback = (result, error) => {
  if (result) {
    console.log(`successfully got stats: ${JSON.stringify(result)}`);
  } else if (error) {
    console.log(`failed to get stats: ${JSON.stringify(error)}`);
  }
  console.log('ended getLeaderboardCallback');
};

// This is a utility function we haven't put into the core SDK yet.  Feel free to use it.
const CompileErrorReport = (error) => {
  if (error === null)
    return "";
  var fullErrors = error.errorMessage;
  for (var paramName in error.errorDetails)
    for (var msgIdx in error.errorDetails[paramName])
      fullErrors += "\n" + paramName + ": " + error.errorDetails[paramName][msgIdx];
  return fullErrors;
}

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/map" component={Streetview} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/" component={Landing} />
      </div>
    </Router>
  );
};

export default App;
