import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import { getScore } from "../utils/helpers";

const Map = ({ setGoogleMaps }) => {
  const [lat, setLat] = React.useState(0);
  const [polyline, setPolyline] = React.useState(0);
  const [lng, setLng] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [map, setMap] = React.useState(0);
  const [origin, setOrigin] = React.useState(0);
  return (
    <div
      style={{
        height: "400px",
        width: "400px",
        position: "absolute",
        bottom: 0,
        right: 0,
        zIndex: 2
      }}
    >
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
        onGoogleApiLoaded={google => {
          setOrigin({ lat: 47.658427, lng: -122.141433 });
          setGoogleMaps(google.maps);
          setMap(google.map);
          setPolyline(new google.maps.Polyline({ path: [origin], geodesic: true }));
        }}
        onClick={e => {
          setLat(e.lat);
          setLng(e.lng);
          setScore(getScore({ lat: e.lat, lng: e.lng }, origin));
          if (polyline) {
            polyline.setPath([{ lat: e.lat, lng: e.lng }, origin]);
            polyline.setMap(map);
          }
        }}
        yesIWantToUseGoogleMapApiInternals
      >
        {lat ? <Marker lat={lat} lng={lng} /> : null}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
