import React from "react";
import GoogleMapReact from "google-map-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import flagMarker from "../assets/red-flag.png";
import circleMarker from "../assets/red-circle.png";
import "../style/score.scss";

const Marker = ({ icon }) => {
  const classname = icon.split(".")[0].split("/static/media/")[1];
  return (
    <div>
      <img className={classname} src={icon} alt="" />
    </div>
  );
};
const Score = ({ location, totalScore }) => {
  const [guessedLatLng, setGuessedLatLng] = React.useState(0);
  const [actualLatLng, setActualLatLng] = React.useState(0);

  const { coordinates, score } = location.state;

  const center = [
    (coordinates.guessed[0] + coordinates.actual[0]) / 2,
    (coordinates.guessed[1] + coordinates.actual[1]) / 2
  ];

  return (
    <>
      <Navbar>
        <div className="navbar-item">
          <div className="user-score">Score: {score}</div>
        </div>
        <div className="navbar-item">
          {totalScore.length === 5 ? (
            <Link to="/leaderboard">View Leaderboard</Link>
          ) : (
            <Link to="/game">Next Round</Link>
          )}
        </div>
      </Navbar>

      <div className="score-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
          center={center}
          defaultZoom={2}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={google => {
            if (coordinates) {
              // using the setstate and creating variable names of the same name
              // is definitely bug-prone
              setGuessedLatLng({ lat: coordinates.guessed[0], lng: coordinates.guessed[1] });
              setActualLatLng({ lat: coordinates.actual[0], lng: coordinates.actual[1] });
              let neBounds = {
                lat:
                  coordinates.guessed[0] > coordinates.actual[0]
                    ? coordinates.guessed[0]
                    : coordinates.actual[0],
                lng:
                  coordinates.guessed[1] > coordinates.actual[1]
                    ? coordinates.guessed[1]
                    : coordinates.actual[1]
              };
              let swBounds = {
                lat:
                  coordinates.guessed[0] < coordinates.actual[0]
                    ? coordinates.guessed[0]
                    : coordinates.actual[0],
                lng:
                  coordinates.guessed[1] < coordinates.actual[1]
                    ? coordinates.guessed[1]
                    : coordinates.actual[1]
              };
              const guessedLatLng = new google.maps.LatLng(
                coordinates.guessed[0],
                coordinates.guessed[1]
              );
              const actualLatLng = new google.maps.LatLng(
                coordinates.actual[0],
                coordinates.actual[1]
              );
              const bounds = new google.maps.LatLngBounds(swBounds, neBounds);
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
      </div>
    </>
  );
};

const displayMarker = (coords, icon) => (
  <Marker key={coords.lat} lat={coords.lat} lng={coords.lng} icon={icon} />
);

export default Score;
