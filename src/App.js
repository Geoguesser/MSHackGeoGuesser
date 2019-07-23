import './style/landing.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Game = () => {
  return (
    <>
      <div id="map"></div>
      <Link to="/"> Home </Link>
    </>
  );
}

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