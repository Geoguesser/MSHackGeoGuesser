import "../style/score.scss";
import React from "react";
import GoogleMapReact from "google-map-react";
import flagMarker from "../assets/red-flag.png";
import circleMarker from "../assets/red-circle.png";
import { Link } from "react-router-dom";
import "../style/game.scss";

const Marker = props => {
  const classname = props.icon.split(".")[0].split("/static/media/")[1];
  return (
    <div>
      <img className={classname} src={props.icon} alt="" />
    </div>
  );
};
const Score = props => {
  const [guessedLatLng, setGuessedLatLng] = React.useState(0);
  const [actualLatLng, setActualLatLng] = React.useState(0);

  const viewLeaderboard = () => {
    props.history.push({
      pathname: "/leaderboard",
      score: props.location.state.score
    });
  };

  return (
    <>
      <div className="user-score">Score: {props.location.state.score}</div>
      <div
        style={{
          height: "100vh",
          width: "100%"
        }}
      >
        <input
          className={"submit-button"}
          type="button"
          value="View Leaderboard"
          onClick={viewLeaderboard}
        />
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
          // todo: calculate actual midpoint between lat/lngs and use this as center
          defaultCenter={{
            lat: 27.658427,
            lng: 0.141433
          }}
          defaultZoom={3}
          yesIWantToUseGoogleMapApiInternals
          options={{
            maxZoom: 3,
            zoomControl: false,
            restriction: {
              latLngBounds: {
                north: 85,
                south: -85,
                west: -180,
                east: 180
              }
            }
          }}
          onGoogleApiLoaded={google => {
            let coordinates = props.location.state.coordinates;
            if (coordinates) {
              const guessedLatLng = new google.maps.LatLng(
                coordinates[0][0].lat,
                coordinates[0][0].lng
              );
              setGuessedLatLng({
                lat: coordinates[0][0].lat,
                lng: coordinates[0][0].lng
              });
              const actualLatLng = new google.maps.LatLng(
                coordinates[0][1].lat,
                coordinates[0][1].lng
              );
              setActualLatLng({
                lat: coordinates[0][1].lat,
                lng: coordinates[0][1].lng
              });
              const bounds = new google.maps.LatLngBounds(guessedLatLng, actualLatLng);
              google.map.fitBounds(bounds);
              coordinates.map(coords => {
                const polyline = new google.maps.Polyline({
                  path: coords
                });
                polyline.setMap(google.map);
              });
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
