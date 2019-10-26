import React from "react";
import GoogleMapReact from "google-map-react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Navbar, NavbarEnd, NavbarItem, NavbarStart } from "../common";
// import "../style/score.scss";
import styles from "../style/score.module.css";
import { env } from "../environment";
import Marker from "./Marker";

interface NavProps {
  roundNumber: number;
  score: number;
  totalScore: number[];
  onClickHome: () => void;
  onClickNextGame: () => void;
}

interface ScoreProps extends RouteComponentProps {
  totalScore: number[];
  roundNumber: number;
  setRoundNumber: React.Dispatch<React.SetStateAction<number>>;
}

function Nav({ roundNumber, score, totalScore, onClickHome, onClickNextGame }: NavProps) {
  return (
    <Navbar brandText="Geoguesser" brandLink="/">
      <NavbarStart>
        <NavbarItem>Score: {score}</NavbarItem>
      </NavbarStart>
      <NavbarEnd>
        <NavbarItem>Round: {roundNumber} / 5</NavbarItem>
        <NavbarItem>
          {totalScore.length === 5 ? (
            <Button onClick={onClickHome}>Go home</Button>
          ) : (
            <Button onClick={onClickNextGame}>Next game</Button>
          )}
        </NavbarItem>
      </NavbarEnd>
    </Navbar>
  );
}

function Score({ history, location, totalScore, roundNumber, setRoundNumber }: ScoreProps) {
  const { guessedLocation, actualLocation, score } = location.state;
  const centerCoordinates = {
    lat: (guessedLocation.lat + actualLocation.lat) / 2,
    lng: (guessedLocation.lng + actualLocation.lng) / 2
  };

  const onClickHome = () => {
    history.push("/home");
  };

  const onClickNextGame = () => {
    setRoundNumber(roundNumber + 1);
    history.push("/game");
  };

  return (
    <>
      <Nav
        roundNumber={roundNumber}
        score={score}
        onClickHome={onClickHome}
        onClickNextGame={onClickNextGame}
        totalScore={totalScore}
      />
      <div className={styles["score-container"]}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: env.googleMap.key }}
          center={centerCoordinates}
          defaultZoom={2}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={google => {
            const northEastLatitude =
              guessedLocation.lat > actualLocation.lat ? guessedLocation.lat : actualLocation.lat;
            const northEastLongitude =
              guessedLocation.lng > actualLocation.lng ? guessedLocation.lng : actualLocation.lng;
            const southWestLatitude =
              guessedLocation.lat < actualLocation.lat ? guessedLocation.lat : actualLocation.lat;
            const southWestLongitude =
              guessedLocation.lng < actualLocation.lng ? guessedLocation.lng : actualLocation.lng;

            const mapBoundary = new google.maps.LatLngBounds(
              {
                lat: southWestLatitude,
                lng: southWestLongitude
              },
              {
                lat: northEastLatitude,
                lng: northEastLongitude
              }
            );

            // closes the map in on the guessed area
            google.map.fitBounds(mapBoundary);

            const googleGuessedLocation = new google.maps.LatLng(
              guessedLocation.lat,
              guessedLocation.lng
            );
            const googleActualLocation = new google.maps.LatLng(
              actualLocation.lat,
              actualLocation.lng
            );

            const polyline = new google.maps.Polyline({
              path: [googleGuessedLocation, googleActualLocation]
            });

            polyline.setMap(google.map);
          }}
        >
          <Marker lat={guessedLocation.lat} lng={guessedLocation.lng} />
          <Marker lat={actualLocation.lat} lng={actualLocation.lng} isFlag />
        </GoogleMapReact>
      </div>
    </>
  );
}
//       <div className="score-container">
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY || "" }}
//           center={center}
//           defaultZoom={2}
//           yesIWantToUseGoogleMapApiInternals
//           onGoogleApiLoaded={google => {
//             if (coordinates) {
//               let neBounds = {
//                 lat:
//                   (coordinates.guessed[0] || 0) > coordinates.actual[0]
//                     ? coordinates.guessed[0]
//                     : coordinates.actual[0],
//                 lng:
//                   (coordinates.guessed[1] || 0) > coordinates.actual[1]
//                     ? coordinates.guessed[1]
//                     : coordinates.actual[1]
//               };
//               let swBounds = {
//                 lat:
//                   (coordinates.guessed[0] || 0) < coordinates.actual[0]
//                     ? coordinates.guessed[0]
//                     : coordinates.actual[0],
//                 lng:
//                   (coordinates.guessed[1] || 0) < coordinates.actual[1]
//                     ? coordinates.guessed[1]
//                     : coordinates.actual[1]
//               };
//               const guessedLatLng = new google.maps.LatLng(
//                 coordinates.guessed[0],
//                 coordinates.guessed[1]
//               );
//               const actualLatLng = new google.maps.LatLng(
//                 coordinates.actual[0],
//                 coordinates.actual[1]
//               );
//               const bounds = new google.maps.LatLngBounds(swBounds, neBounds);
//               google.map.fitBounds(bounds);
//               const polyline = new google.maps.Polyline({
//                 path: [guessedLatLng, actualLatLng]
//               });
//               polyline.setMap(google.map);
//             }
//           }}
//         >
//           <Marker icon={circleMarker} />
//           <Marker icon={flagMarker} />
//         </GoogleMapReact>
//       </div>

// const Score = ({ history, location, totalScore, roundNumber, setRoundNumber }: ScoreProps) => {
//   const [guessedLatLng, setGuessedLatLng] = React.useState<number>(0);
//   const [actualLatLng, setActualLatLng] = React.useState<number>(0);

//   const {
//     coordinates,
//     score
//   }: {
//     coordinates: {
//       guessed: (number | null)[];
//       actual: number[];
//     };
//     score: number;
//   } = location.state;

//   const center = {
//     lat: (coordinates.guessed[0] || 0 + coordinates.actual[0]) / 2,
//     lng: (coordinates.guessed[1] || 0 + coordinates.actual[1]) / 2
//   };

//   function onClickNextGame() {
//     setRoundNumber(roundNumber + 1);
//     history.push("/game");
//   }

//   function onClickViewLeaderboard() {
//     history.push("/leaderboard");
//   }

//   return (
//     <>
//       <Nav
//         roundNumber={roundNumber}
//         score={score}
//         onClickViewLeaderboard={onClickViewLeaderboard}
//         onClickNextGame={onClickNextGame}
//         totalScore={totalScore}
//       />

//     </>
//   );
// };

export default Score;
