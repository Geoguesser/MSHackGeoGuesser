import React from "react";
import GoogleMapReact from "google-map-react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Navbar, NavbarEnd, NavbarItem, NavbarStart } from "../common";
import flagMarker from "../assets/red-flag.png";
import circleMarker from "../assets/red-circle.png";
import "../style/score.scss";

interface NavProps {
  roundNumber: number;
  score: number;
  totalScore: number[];
  onClickViewLeaderboard: () => void;
  onClickNextGame: () => void;
}

function Nav({
  roundNumber,
  score,
  totalScore,
  onClickViewLeaderboard,
  onClickNextGame
}: NavProps) {
  return (
    <Navbar brandText="Geoguesser" brandLink="/">
      <NavbarStart>
        <NavbarItem>Score: {score}</NavbarItem>
      </NavbarStart>
      <NavbarEnd>
        <NavbarItem>Round: {roundNumber} / 5</NavbarItem>
        <NavbarItem>
          {totalScore.length === 5 ? (
            <Button onClick={onClickViewLeaderboard}>View leaderboard</Button>
          ) : (
            <Button onClick={onClickNextGame}>Next game</Button>
          )}
        </NavbarItem>
      </NavbarEnd>
    </Navbar>
  );
}

interface MarkerProps {
  icon: string;
}

const Marker = ({ icon }: MarkerProps) => {
  const classname = icon.split(".")[0].split("/static/media/")[1];
  return (
    <div>
      <img className={classname} src={icon} alt="" />
    </div>
  );
};

interface ScoreProps extends RouteComponentProps {
  totalScore: number[];
  roundNumber: number;
  setRoundNumber: React.Dispatch<React.SetStateAction<number>>;
}

const Score = ({ history, location, totalScore, roundNumber, setRoundNumber }: ScoreProps) => {
  const [guessedLatLng, setGuessedLatLng] = React.useState<number>(0);
  const [actualLatLng, setActualLatLng] = React.useState<number>(0);

  const {
    coordinates,
    score
  }: {
    coordinates: {
      guessed: (number | null)[];
      actual: number[];
    };
    score: number;
  } = location.state;

  const center = {
    lat: (coordinates.guessed[0] || 0 + coordinates.actual[0]) / 2,
    lng: (coordinates.guessed[1] || 0 + coordinates.actual[1]) / 2
  };

  function onClickNextGame() {
    setRoundNumber(roundNumber + 1);
    history.push("/game");
  }

  function onClickViewLeaderboard() {
    history.push("/leaderboard");
  }

  return (
    <>
      <Nav
        roundNumber={roundNumber}
        score={score}
        onClickViewLeaderboard={onClickViewLeaderboard}
        onClickNextGame={onClickNextGame}
        totalScore={totalScore}
      />

      <div className="score-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY || "" }}
          center={center}
          defaultZoom={2}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={google => {
            if (coordinates) {
              let neBounds = {
                lat:
                  (coordinates.guessed[0] || 0) > coordinates.actual[0]
                    ? coordinates.guessed[0]
                    : coordinates.actual[0],
                lng:
                  (coordinates.guessed[1] || 0) > coordinates.actual[1]
                    ? coordinates.guessed[1]
                    : coordinates.actual[1]
              };
              let swBounds = {
                lat:
                  (coordinates.guessed[0] || 0) < coordinates.actual[0]
                    ? coordinates.guessed[0]
                    : coordinates.actual[0],
                lng:
                  (coordinates.guessed[1] || 0) < coordinates.actual[1]
                    ? coordinates.guessed[1]
                    : coordinates.actual[1]
              };
              const guessedLatLng = new google.maps.LatLng(
                coordinates.guessed[0],
                coordinates.guessed[1]
              );
              const actualLatLng = new google.maps.LatLng(
                coordinates.actual[0],
                coordinates.actual[1]
              );
              const bounds = new google.maps.LatLngBounds(swBounds, neBounds);
              google.map.fitBounds(bounds);
              const polyline = new google.maps.Polyline({
                path: [guessedLatLng, actualLatLng]
              });
              polyline.setMap(google.map);
            }
          }}
        >
          <Marker icon={circleMarker} />
          <Marker icon={flagMarker} />
        </GoogleMapReact>
      </div>
    </>
  );
};

export default Score;
