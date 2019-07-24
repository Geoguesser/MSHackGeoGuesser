import "../style/game.scss";
import React from "react";
import { withRouter } from "react-router-dom";
import Map from "./Map";
import StreetView from "./Streetview";

const Game = ({ history }) => {
  const [googleMaps, setGoogleMaps] = React.useState(null);
  const [insetMapLat, setInsetMapLat] = React.useState(0);
  const [insetMapLng, setInsetMapLng] = React.useState(0);

  const submitGuess = () => {
    console.log(`set latitude: ${insetMapLat}`);
    console.log(`set longitude: ${insetMapLng}`);

    // todo: calculate score, redirect to scoreboard with payload of score
    history.push({
      pathname: "/score"
    });
  };

  return (
    <>
      <input
        className="submit-button"
        type="button"
        value="Submit Guess"
        onClick={submitGuess}
      />
      <Map
        insetMapLat={insetMapLat}
        setInsetMapLat={setInsetMapLat}
        insetMapLng={insetMapLng}
        setInsetMapLng={setInsetMapLng}
        setGoogleMaps={setGoogleMaps}
      />
      <StreetView googleMaps={googleMaps} />
    </>
  );
};

export default withRouter(Game);
