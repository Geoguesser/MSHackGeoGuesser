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
  console.dir(props.location.state);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%"
      }}
    >
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
            console.log(coordinates[0][0].lat);
            const guessedLatLng = new google.maps.LatLng(
              coordinates[0][0].lat,
              coordinates[0][0].lng
            );
            const actualLatLng = new google.maps.LatLng(
              coordinates[0][1].lat,
              coordinates[0][1].lng
            );
            const bounds = new google.maps.LatLngBounds(
              guessedLatLng,
              actualLatLng
            );
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
        {props.location.state.coordinates
          ? displayMarkers(props.location.state.coordinates)
          : null}
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
