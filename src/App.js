import "./style/landing.scss";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";

const Game = () => (
  <div style={{ height: "100vh", width: "100%" }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyCwD_7knzyafxUbMx7CYGek02bj9UJcdBE" }}
      defaultCenter={{
        lat: 59.95,
        lng: 30.33
      }}
      defaultZoom={0}
    />
  </div>
);

const Landing = () => {
  return (
    <div className="landing">
      <header>
        <h1>MS Geoguesser</h1>
      </header>
        <Link className="start-btn" to="/game">
          Play Geoguesser
        </Link>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/game" component={Game} />
        <Route exact path="/" component={Landing} />
      </div>
    </Router>
  );
};

export default App;
