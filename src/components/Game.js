import React from "react";
import Map from "./Map";
import StreetView from "./Streetview";
import { getLat, getLng } from "../utils/helpers";

function Game() {
  const [googleMaps, setGoogleMaps] = React.useState(null);
  const [streetLat, setStreetLat] = React.useState(getLat());
  const [streetLng, setStreetLng] = React.useState(getLng());
  return (
    <>
      <Map setGoogleMaps={setGoogleMaps} />
      <StreetView
        streetLat={streetLat}
        setStreetLat={setStreetLat}
        streetLng={streetLng}
        setStreetLng={setStreetLng}
        googleMaps={googleMaps}
      />
    </>
  );
}

export default Game;
