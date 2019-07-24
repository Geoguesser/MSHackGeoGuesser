import React from "react";
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
  // props.coordinates (array of coordinates)
  // Example:
  // coordinates={[
  //   [
  //     { lat: 47.658427, lng: -122.141433 },
  //     { lat: 51.529654, lng: -119.328933 }
  //   ],
  //   [
  //     { lat: 28.761321, lng: -103.323608 },
  //     { lat: 35.294347, lng: -101.209622 }
  //   ],
  //   [
  //     { lat: -14.890877, lng: -61.2950687 },
  //     { lat: 42.384539, lng: -5.85465 }
  //   ],
  //   [
  //     { lat: -36.043767, lng: 148.087501 },
  //     { lat: -8.922396, lng: 37.288956 }
  //   ]
  // ]}

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
        defaultZoom={3}
        yesIWantToUseGoogleMapApiInternals
        options={{
          minZoom: 3,
          minZoomOverride: true,
          maxZoom: 3,
          zoomControl: false
        }}
        onGoogleApiLoaded={google => {
          props.coordinates &&
            props.coordinates.map(coordinate => {
              const polyline = new google.maps.Polyline({
                path: coordinate
              });
              polyline.setMap(google.map);
            });
        }}
      >
        {props.coordinates ? displayMarkers(props.coordinates) : null}
      </GoogleMapReact>
      <Link to="/game">Next Game</Link>
    </div>
  );
};

const displayMarkers = coordinates => {
  return coordinates.map((coordinate, index) => {
    return coordinate.map(latlng => {
      return <Marker key={latlng.lat} lat={latlng.lat} lng={latlng.lng} />;
    });
  });
};

export default Score;
