import React from "react";
import { withRouter } from 'react-router-dom';
import Map from "./Map";
import StreetView from "./Streetview";

const Game = () => {
  const [googleMaps, setGoogleMaps] = React.useState(null);
  const [insetMapLat, setInsetMapLat] = React.useState(0);
  const [insetMapLng, setInsetMapLng] = React.useState(0);

  const submitGuess = () => {
    console.log(`set latitude: ${insetMapLat}`);
    console.log(`set longitude: ${insetMapLng}`);

    // todo: calculate score, redirect to scoreboard with payload of score
  };

  return (
    <>
      <input style={{ margin: '10px', zIndex: '9999999', position: 'relative', float: 'right', right: '15px' }}
        type="button" value="Submit Guess" onClick={submitGuess} />
      <Map insetMapLat={insetMapLat} setInsetMapLat={setInsetMapLat} insetMapLng={insetMapLng} setInsetMapLng={setInsetMapLng} setGoogleMaps={setGoogleMaps} />
      <StreetView googleMaps={googleMaps} />
    </>
  );
}

export default withRouter(Game);
