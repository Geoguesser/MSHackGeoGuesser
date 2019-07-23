import "./style/landing.scss";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import Streetview from "./components/Streetview";
import marker from "./assets/placeholder.png";


const rad = function(x) {
  return x * Math.PI / 180;
};

const getDistance = function(p1, p2) {
  const R = 6378137; // Earth’s mean radius in meter
  const dLat = rad(p2.lat - p1.lat);
  const dLong = rad(p2.lng - p1.lng);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d; // returns the distance in meter
};

const getScore = (pt1, pt2) => {
  const distance = getDistance(pt1, pt2) / 1000
  return Math.round(5000*Math.exp(-distance/1200))+1;
}

const Marker = () => {
  return (
    <div>
      <img src={marker} alt="" />
    </div>
  );
};

export const Game = (props) => {
  const [lat, setLat] = useState(0);
  const [polyline, setPolyline] = useState(0);
  const [lng, setLng] = useState(0);
  const [score, setScore] = useState(0);
  const [map, setMap] = useState(0);
  // const [maps, setMaps] = useState(0);
  const [origin, setOrigin] = useState(0);
  return (
  <div style={{ height: "400px", width: "400px", position: "absolute", bottom: 0, right: 0, zIndex: 2 }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
      defaultCenter={{
        lat: 47.658427,
        lng: -122.141433
      }}
      defaultZoom={0}
      options={{
        fullscreenControl: false
      }}
      onGoogleApiLoaded={(map) => {
        setOrigin({ lat: 47.658427, lng: -122.141433 });
        props.setMap(map.maps);
        setMap(map.map);
        // setMaps(map.maps)
        setPolyline(new map.maps.Polyline({ path: [origin] }));
      }}
      onClick={ e =>  {
        setLat(e.lat);
        setLng(e.lng);
        setScore(getScore({lat: e.lat, lng: e.lng}, origin))
        if (polyline) {
          polyline.setPath([{lat: e.lat, lng: e.lng}, origin])
          polyline.setMap(map);
        }
        console.log(score);
      }}
      yesIWantToUseGoogleMapApiInternals
    >
      {lat ?
        (<Marker lat={lat} lng={lng} />)
        : null
      }
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
        <Route exact path="/" component={Landing} />
      </div>
    </Router>
  );
};

export default App;
