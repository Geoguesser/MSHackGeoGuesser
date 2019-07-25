import React from "react";
import { withRouter } from "react-router-dom";
import Map from "./Map";
import StreetView from "./Streetview";
import { getScore } from "../utils/helpers";
import "../style/game.scss";

const Game = ({ history }) => {
  const [googleMaps, setGoogleMaps] = React.useState(0);
  const [streetLat, setStreetLat] = React.useState(0);
  const [streetLng, setStreetLng] = React.useState(0);

  const [insetMapLat, setInsetMapLat] = React.useState(null);
  const [insetMapLng, setInsetMapLng] = React.useState(null);

  const submitGuess = () => {
    if (insetMapLat === null || insetMapLng === null) {
    } else {
      const coordinates = {
        guessed: [insetMapLat, insetMapLng],
        actual: [streetLat, streetLng]
      };
      const score = getScore(
        { lat: insetMapLat, lng: insetMapLng },
        { lat: streetLat, lng: streetLng }
      );

      history.push({
        pathname: "/score",
        state: {
          coordinates,
          score
        }
      });
    }
  };

  return (
    <>
      <input
        className={insetMapLat ? "submit-button" : "submit-btn-inactive"}
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
      {googleMaps ? (
        <StreetView
          streetLat={streetLat}
          setStreetLat={setStreetLat}
          streetLng={streetLng}
          setStreetLng={setStreetLng}
          googleMaps={googleMaps}
        />
      ) : null}
    </>
  );
};

export default withRouter(Game);
