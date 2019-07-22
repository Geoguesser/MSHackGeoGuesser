import './style/landing.scss';
import React from 'react';
import { GoogleMap, Marker } from "react-google-maps"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Game = () => {
  return (
    <>
      <MyMapComponent />
      <h1> Sup. </h1>
      <Link to="/"> Home </Link>
    </>
  );
}

const MyMapComponent = (props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>

const Landing = () => {
  return (
      <>
      <div className="App">
        <header>
            <h1>MS Geoguesser</h1>
          </header>
          <div className="viewport">
            <Link className="start-btn" to="/game">
              Play Geoguesser
            </Link>
          </div>
      </div>
      <Link to="/game"> Play </Link>
    </>
  );
}

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/game" component={Game} />
        <Route exact path="/" component={Landing} />
      </div>
    </Router>
  );
}

export default App;