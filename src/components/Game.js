import React from "react";
import Map from "./Map";
import StreetView from "./Streetview";

function Game() {
  const [googleMaps, setGoogleMaps] = React.useState(null);
  return (
    <>
      <Map setGoogleMaps={setGoogleMaps} />
      <StreetView googleMaps={googleMaps} />
    </>
  );
}

export default Game;
