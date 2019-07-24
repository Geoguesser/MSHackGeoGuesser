import "../style/game.scss";
import React from "react";
import { withRouter } from "react-router-dom";
import Map from "./Map";
import StreetView from "./Streetview";
import { getLat, getLng, getScore } from "../utils/helpers";

const Game = ({ history }) => {
  const [googleMaps, setGoogleMaps] = React.useState(null);
  const [streetLat, setStreetLat] = React.useState(getLat());
  const [streetLng, setStreetLng] = React.useState(getLng());

  const [insetMapLat, setInsetMapLat] = React.useState(0);
  const [insetMapLng, setInsetMapLng] = React.useState(0);

  const submitGuess = () => {
    console.log(`guessed latitude: ${insetMapLat}`);
    console.log(`guessed longitude: ${insetMapLng}`);
    console.log(`actual latitude: ${streetLat}`);
    console.log(`actual longitude: ${streetLng}`);

    const coordinates = [{ lat: insetMapLat, lng: insetMapLng }, { lat: streetLat, lng: streetLng }];
    const score = getScore({ lat: insetMapLat, lng: insetMapLng }, { lat: streetLat, lng: streetLng });

    history.push({
      pathname: "/score",
      state: {
        coordinates: [coordinates],
        score
      }
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
      <StreetView
        streetLat={streetLat}
        setStreetLat={setStreetLat}
        streetLng={streetLng}
        setStreetLng={setStreetLng}
        googleMaps={googleMaps}
      />
    </>
  );
};

export default withRouter(Game);
