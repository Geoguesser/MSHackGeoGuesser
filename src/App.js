import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Game() {
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
      <h1> MS Geoguesser</h1>
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
