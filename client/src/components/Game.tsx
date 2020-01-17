import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Navbar, NavbarEnd, NavbarItem } from "../common";
// import Map from "./Map";
import StreetView from "./Streetview";
import { getScore } from "../utils/helpers";

interface NavProps {
  roundNumber: number;
  insetMapLat: number | null;
  insetMapLng: number | null;
  submitGuess: () => void;
}

interface GameProps extends RouteComponentProps {
  setTotalScore: React.Dispatch<React.SetStateAction<number[]>>;
  totalScore: number[];
  roundNumber: number;
}

function Nav({ roundNumber, insetMapLat, insetMapLng, submitGuess }: NavProps): JSX.Element {
  return (
    <Navbar brandText="Geoguesser">
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

const Game = ({ history, setTotalScore, totalScore, roundNumber }: GameProps): JSX.Element => {
  const [googleMaps, setGoogleMaps] = React.useState<any>(null);
  const [streetLat, setStreetLat] = React.useState<number>(0);
  const [streetLng, setStreetLng] = React.useState<number>(0);

  const [insetMapLat, setInsetMapLat] = React.useState<number | null>(null);
  const [insetMapLng, setInsetMapLng] = React.useState<number | null>(null);

  const submitGuess = (): void => {
    const coordinates: {
      guessed: (number | null)[];
      actual: number[];
    } = {
      guessed: [insetMapLat, insetMapLng],
      actual: [streetLat, streetLng]
    };
    const score: number = getScore({ lat: insetMapLat, lng: insetMapLng }, { lat: streetLat, lng: streetLng });
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
      <Nav roundNumber={roundNumber} insetMapLat={insetMapLat} insetMapLng={insetMapLng} submitGuess={submitGuess} />
      {/* <Map
        insetMapLat={insetMapLat}
        setInsetMapLat={setInsetMapLat}
        insetMapLng={insetMapLng}
        setInsetMapLng={setInsetMapLng}
        setGoogleMaps={setGoogleMaps}
      /> */}
      {googleMaps ? (
        <StreetView setStreetLat={setStreetLat} setStreetLng={setStreetLng} googleMaps={googleMaps} />
      ) : null}
    </>
  );
};

export default Game;
