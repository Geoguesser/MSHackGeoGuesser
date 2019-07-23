import "./style/landing.scss";
import React from "react";
import { compose, withProps } from "recompose";
import { withGoogleMap, GoogleMap, withScriptjs } from "react-google-maps";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StreetView from "./components/Streetview";

const MapView = () => {
  return (
    <>
      <MyMapComponent />
      <h1> Sup. </h1>
      <Link to="/"> Home </Link>
    </>
  );
};

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&callback=initMap`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `1000px`, display: "none" }} />,
    mapElement: <div style={{ height: `100%` }} />,
    isMarkerShown: false,
    defaultZoom: 8
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={9}
    defaultCenter={{
      lat: parseFloat(props.userLat),
      lng: parseFloat(props.userLng)
    }}
  />
));

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
    </>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/mapview" component={MapView} />
        <Route exact path="/game" component={StreetView} />
        <Route exact path="/" component={Landing} />
      </div>
    </Router>
  );
};

export default App;
