import './style/landing.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Game () {
  return (
    <>
      <h1> Sup. </h1>
      <Link to="/"> Home </Link>
    </>
  );
}

function Landing() {
  return (
      <>
      <div className="App">
        <header>
            <h1>MS Geoguesser</h1>
          </header>
          <div className="viewport">
            <h2 className="start-btn">Play Geoguesser</h2>
          </div>
      </div>
      <Link to="/game"> Play </Link>
    </>
  );
}

function App() {
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