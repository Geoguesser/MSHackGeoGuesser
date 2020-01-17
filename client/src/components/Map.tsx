import React from "react";
import GoogleMapReact from "google-map-react";
// import Marker from "./Marker";

interface MapProps {
  setGoogleMaps: React.Dispatch<React.SetStateAction<any>>;
  insetMapLat: number | null;
  insetMapLng: number | null;
  setInsetMapLat: React.Dispatch<React.SetStateAction<number | null>>;
  setInsetMapLng: React.Dispatch<React.SetStateAction<number | null>>;
}

const Map = ({ setGoogleMaps, insetMapLat, insetMapLng, setInsetMapLat, setInsetMapLng }: MapProps) => {
  const mapKey = process.env.REACT_APP_GOOGLE_MAP_KEY || "";
  return (
    <div
      style={{
        height: "400px",
        width: "400px",
        position: "absolute",
        bottom: 20,
        right: 5,
        zIndex: 2
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: mapKey }}
        defaultCenter={{
          lat: 47.658427,
          lng: -122.141433
        }}
        defaultZoom={0}
        options={{
          fullscreenControl: false
        }}
        onGoogleApiLoaded={google => {
          setGoogleMaps(google.maps);
        }}
        onClick={e => {
          setInsetMapLat(e.lat);
          setInsetMapLng(e.lng);
        }}
        yesIWantToUseGoogleMapApiInternals
      >
        {/* {insetMapLat && insetMapLng ? <Marker lat={insetMapLat} lng={insetMapLng} /> : null} */}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
