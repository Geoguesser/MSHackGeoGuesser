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
  // props.polylines
  // props.score
  let polyLines;

  return (
    <div
      style={{
        height: "100vh",
        width: "100%"
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
        defaultCenter={{
          lat: 27.658427,
          lng: 0.141433
        }}
        defaultZoom={5}
        yesIWantToUseGoogleMapApiInternals
        options={{
          minZoom: 5,
          minZoomOverride: true,
          maxZoom: 5,
          zoomControl: false
        }}
        onGoogleApiLoaded={google => {
          polyLines = [
            new google.maps.Polyline({
              path: [
                { lat: 47.658427, lng: -122.141433 },
                { lat: 51.529654, lng: -119.328933 }
              ],
              geodesic: true
            })
          ];
          polyLines.map(polyline => polyline.setMap(google.map));
        }}
      />
      <Link to="/game">Next Game</Link>
    </div>
  );
};

export default Score;
