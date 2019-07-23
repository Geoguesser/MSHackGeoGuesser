import "./style/landing.scss";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import marker from './assets/placeholder.png';

const Marker = () => {
  return (
  <div>
    <img src={marker} alt=""/>
  </div>
  )
}

const Game = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  return (
  <div style={{ height: "100vh", width: "100%" }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyCwD_7knzyafxUbMx7CYGek02bj9UJcdBE" }}
      defaultCenter={{
        lat: 59.95,
        lng: 30.33
      }}
      onClick={e =>  {
        setLat(e.lat)
        setLng(e.lng)
      }}
      defaultZoom={0}
      yesIWantToUseGoogleMapApiInternals
    >
      {lat ?
       (<Marker lat={lat} lng={lng} />)
      : null
      }
    </GoogleMapReact>
  </div>
)};

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
