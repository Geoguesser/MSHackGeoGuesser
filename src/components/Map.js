import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import { getScore } from "../utils/helpers";

const Map = ({ setGoogleMaps, insetMapLat, insetMapLng, setInsetMapLat, setInsetMapLng }) => {
  const [polyline, setPolyline] = React.useState(0);
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
        onGoogleApiLoaded={map => {
          setOrigin({ lat: 47.658427, lng: -122.141433 });
          setGoogleMaps(map.maps);
          setMap(map.map);
          setPolyline(new map.maps.Polyline({ path: [origin] }));
        }}
        onClick={e => {
          setInsetMapLat(e.lat);
          setInsetMapLng(e.lng);
          setScore(getScore({ lat: e.lat, lng: e.lng }, origin));
          if (polyline) {
            polyline.setPath([{ lat: e.lat, lng: e.lng }, origin]);
            polyline.setMap(map);
          }
          console.log(score);
        }}
        yesIWantToUseGoogleMapApiInternals
      >
        {insetMapLat && insetMapLng ? <Marker lat={insetMapLat} lng={insetMapLng} /> : null}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
