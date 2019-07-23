import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import marker from "../assets/placeholder.png";
import { Link } from "react-router-dom";

const Marker = () => {
  return (
    <div>
      <img src={marker} alt="" />
    </div>
  );
};

const Score = props => {
  const [lat] = useState(0);
  const [lng] = useState(0);
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "absolute"
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
        defaultCenter={{
          lat: 27.658427,
          lng: 0.141433
        }}
        defaultZoom={3}
        yesIWantToUseGoogleMapApiInternals
        options={{
          minZoom: 3,
          minZoomOverride: true,
          maxZoom: 3,
          zoomControl: false
        }}
      >
        {lat ? <Marker lat={lat} lng={lng} /> : null}
      </GoogleMapReact>
      <header>
        <h1>Total Score: {props.score ? props.score : 1000}</h1>
      </header>
      <Link to="/game">Next Game</Link>
    </div>
  );
};

export default Score;
