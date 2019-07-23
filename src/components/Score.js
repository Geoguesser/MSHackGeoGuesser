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
  // props.location
  // props.guess
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
      />
      <Link to="/game">Next Game</Link>
    </div>
  );
};

export default Score;
