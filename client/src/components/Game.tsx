import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Navbar, NavbarEnd, NavbarItem } from "../common";
import StreetView from "./Streetview";
import { getScore, pickCity } from "../utils/helpers";
import MiniMap from "./MiniMap";
import { GuessedLocation, ActualLocation } from "../utils/types";

interface NavProps {
  roundNumber: number;
  submitDisabled: boolean;
  makeGuess: () => void;
}

interface GameProps extends RouteComponentProps {
  setTotalScore: React.Dispatch<React.SetStateAction<number[]>>;
  totalScore: number[];
  roundNumber: number;
}

function Nav({ roundNumber, submitDisabled, makeGuess }: NavProps): JSX.Element {
  return (
    <Navbar brandText="Geoguesser">
      <NavbarEnd>
        <NavbarItem>Round: {roundNumber} / 5</NavbarItem>
        <NavbarItem>
          <Button disabled={submitDisabled} onClick={makeGuess}>
            Submit guess
          </Button>
        </NavbarItem>
      </NavbarEnd>
    </Navbar>
  );
}

function Game({ history, setTotalScore, totalScore, roundNumber }: GameProps): JSX.Element {
  // we cannot have 2 instances of google maps object, so we need to pass from one google maps component
  // to the other. Pretty hacky, but have not found another way around it.
  const [googleMaps, setGoogleMaps] = React.useState<any>(undefined);
  const [guessedLocation, setGuessedLocation] = React.useState<GuessedLocation>({
    lat: undefined,
    lng: undefined
  });
  const actualLocation: ActualLocation = pickCity();

  const makeGuess = () => {
    const score = getScore(guessedLocation, actualLocation);
    setTotalScore([...totalScore, score]);
    history.push({
      pathname: "/score",
      state: { score, guessedLocation, actualLocation }
    });
  };

  return (
    <>
      <Nav
        submitDisabled={!guessedLocation.lat || !guessedLocation.lng}
        makeGuess={makeGuess}
        roundNumber={roundNumber}
      />
      <MiniMap setGoogleMaps={setGoogleMaps} setGuessedLocation={setGuessedLocation} />
      {googleMaps ? <StreetView googleMaps={googleMaps} location={actualLocation} /> : null}
    </>
  );
}

export default Game;
