import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

const Map = ({
  setGoogleMaps,
  insetMapLat,
  insetMapLng,
  setInsetMapLat,
  setInsetMapLng
}) => {
  const [origin, setOrigin] = React.useState();
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
        }}
        onClick={e => {
          setInsetMapLat(e.lat);
          setInsetMapLng(e.lng);
        }}
        yesIWantToUseGoogleMapApiInternals
      >
        {insetMapLat && insetMapLng ? (
          <Marker lat={insetMapLat} lng={insetMapLng} />
        ) : null}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
