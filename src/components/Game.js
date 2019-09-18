import React from "react";
import { Button, Navbar, NavbarEnd, NavbarItem } from "../common";
import Map from "./Map";
import StreetView from "./Streetview";
import { getScore } from "../utils/helpers";
import "../style/game.scss";

function Nav({ roundNumber, insetMapLat, insetMapLng, submitGuess }) {
  return (
    <Navbar brandText="Geoguesser" brandLink="/">
      <NavbarEnd>
        <NavbarItem>Round: {roundNumber} / 5</NavbarItem>
        <NavbarItem>
          <Button disabled={!insetMapLat || !insetMapLng} onClick={submitGuess}>
            Submit guess
          </Button>
        </NavbarItem>
      </NavbarEnd>
    </Navbar>
  );
}

const Game = ({ history, setTotalScore, totalScore, roundNumber }) => {
  const [googleMaps, setGoogleMaps] = React.useState(0);
  const [streetLat, setStreetLat] = React.useState(0);
  const [streetLng, setStreetLng] = React.useState(0);

  const [insetMapLat, setInsetMapLat] = React.useState(null);
  const [insetMapLng, setInsetMapLng] = React.useState(null);

  const submitGuess = () => {
    const coordinates = {
      guessed: [insetMapLat, insetMapLng],
      actual: [streetLat, streetLng]
    };
    const score = getScore(
      { lat: insetMapLat, lng: insetMapLng },
      { lat: streetLat, lng: streetLng }
    );
    setTotalScore([...totalScore, score]);
    history.push({
      pathname: "/score",
      state: {
        coordinates,
        score
      }
    });
  };

  return (
    <>
      <Nav
        roundNumber={roundNumber}
        insetMapLat={insetMapLat}
        insetMapLng={insetMapLng}
        submitGuess={submitGuess}
      >
        {/* <div className="navbar-item">
          <span>{roundNumber} / 5</span>
        </div>
        <div className="navbar-item">
          <Button disabled={!insetMapLat || !insetMapLng} onClick={submitGuess}>
            Submit guess
          </Button>
        </div> */}
      </Nav>
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

export default Game;
