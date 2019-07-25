import React from "react";
import GoogleMapReact from "google-map-react";
import flagMarker from "../assets/red-flag.png";
import circleMarker from "../assets/red-circle.png";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { getMidPoint } from "../utils/helpers";
import "../style/game.scss";
import "../style/score.scss";

const Marker = props => {
  const classname = props.icon.split(".")[0].split("/static/media/")[1];
  return (
    <div>
      <img className={classname} src={props.icon} alt="" />
    </div>
  );
};

const Score = ({ history, location }) => {
  const [guessedLatLng, setGuessedLatLng] = React.useState(0);
  const [actualLatLng, setActualLatLng] = React.useState(0);

  const viewLeaderboard = () => {
    history.push({
      pathname: "/leaderboard",
      score: location.state.score
    });
  };

  const { coordinates, score } = location.state;
  return (
    <>
      <Navbar>
        <div className="navbar-item">
          <button className="submit-button" onClick={viewLeaderboard}>
            View Leaderboard
          </button>
        </div>
        <div className="navbar-item">
          <span>Score: {score}</span>
        </div>
      </Navbar>
      <div className="score-container">
        <GoogleMapReact
          center={getMidPoint(coordinates)}
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
          // todo: calculate actual midpoint between lat/lngs and use this as center
          defaultZoom={3}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={google => {
            if (coordinates) {
              // potentially a major bug, we are in a weird data position
              // creating lat long same name as state. redundant work.
              // solved by abstracting the state higher
              const guessedLatLng = new google.maps.LatLng(
                coordinates.guessed[0],
                coordinates.guessed[1]
              );
              const actualLatLng = new google.maps.LatLng(
                coordinates.actual[0],
                coordinates.actual[1]
              );
              setGuessedLatLng({ lat: coordinates.guessed[0], lng: coordinates.guessed[1] });
              setActualLatLng({ lat: coordinates.actual[0], lng: coordinates.actual[1] });
              // bounds === getMidPoint()
              const bounds = new google.maps.LatLngBounds(guessedLatLng, actualLatLng);
              google.map.fitBounds(bounds);
              const polyline = new google.maps.Polyline({
                path: [guessedLatLng, actualLatLng]
              });
              polyline.setMap(google.map);
            }
          }}
        >
          {displayMarker(guessedLatLng, circleMarker)}
          {displayMarker(actualLatLng, flagMarker)}
        </GoogleMapReact>
        <Link to="/game">Next Game</Link>
      </div>
    </>
  );
};

const displayMarker = (coords, icon) => (
  <Marker key={coords.lat} lat={coords.lat} lng={coords.lng} icon={icon} />
);

export default Score;
