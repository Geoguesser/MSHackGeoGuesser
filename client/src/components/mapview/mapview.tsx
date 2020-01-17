import * as React from "react";
import GoogleMapReact, {
  Props as GoogleMapReactProps,
  ChildComponentProps as GoogleMapChildProps
} from "google-map-react";
import marker from "../../assets/placeholder.png";

import styles from "./mapview.module.css";

const googleMapKey = process.env.REACT_APP_GOOGLE_MAP_KEY;

const googleMapReactConfig: GoogleMapReactProps = {
  bootstrapURLKeys: { key: googleMapKey || "" },
  defaultCenter: { lat: 47.658427, lng: -122.141433 },
  defaultZoom: 0,
  options: { fullscreenControl: false },
  yesIWantToUseGoogleMapApiInternals: true
};

interface MapViewProps {
  setGoogleMapsObject: React.Dispatch<React.SetStateAction<any>>;
  setMarkerLongitude: React.Dispatch<React.SetStateAction<number | undefined>>;
  setMarkerLatitude: React.Dispatch<React.SetStateAction<number | undefined>>;
  markerLatitude?: number;
  markerLongitude?: number;
}

function MapView(props: MapViewProps) {
  const updateMarkerLocation = (location: any) => {
    props.setMarkerLatitude(location.lat);
    props.setMarkerLongitude(location.lng);
  };

  return (
    <div className={styles["map"]}>
      <GoogleMapReact
        {...googleMapReactConfig}
        onGoogleApiLoaded={props.setGoogleMapsObject}
        onClick={updateMarkerLocation}
      >
        {props.markerLatitude && props.markerLongitude ? (
          <Marker lat={props.markerLatitude} lng={props.markerLongitude} />
        ) : null}
      </GoogleMapReact>
    </div>
  );
}

function Marker(props: GoogleMapChildProps): JSX.Element {
  return (
    <div>
      <img className={styles["marker"]} src={marker} alt="map marker" />
    </div>
  );
}

export default MapView;
