import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import { env } from "../environment";
import styles from "../style/minimap.module.css";
import { GuessedLocation } from "../utils/types";

interface MiniMapProps {
  setGoogleMaps: React.Dispatch<React.SetStateAction<any>>;
  setGuessedLocation: React.Dispatch<React.SetStateAction<GuessedLocation>>;
}

function MiniMap({ setGoogleMaps, setGuessedLocation }: MiniMapProps): JSX.Element {
  const [markerLatitude, setMarkerLatitude] = React.useState<number | undefined>(undefined);
  const [markerLongitude, setMarkerLongitude] = React.useState<number | undefined>(undefined);

  const center = {
    lat: 47.658427,
    lng: -122.141433
  };
  const zoomLevel = 0;

  const updateMarkerPosition = (locationObj: { lng: number; lat: number }) => {
    setMarkerLatitude(locationObj.lat);
    setMarkerLongitude(locationObj.lng);
    setGuessedLocation({
      lat: locationObj.lat,
      lng: locationObj.lng
    });
  };

  const setGoogleMapsObject = (googleMaps: { map: any; maps: any }) => {
    setGoogleMaps(googleMaps.maps);
  };

  return (
    <div className={styles["wrapper"]}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: env.googleMap.key }}
        defaultCenter={center}
        defaultZoom={zoomLevel}
        options={{ fullscreenControl: false }}
        onClick={updateMarkerPosition}
        onGoogleApiLoaded={setGoogleMapsObject}
        yesIWantToUseGoogleMapApiInternals
      >
        {markerLongitude && markerLatitude ? (
          <Marker lat={markerLatitude} lng={markerLongitude} />
        ) : null}
      </GoogleMapReact>
    </div>
  );
}

export default MiniMap;
