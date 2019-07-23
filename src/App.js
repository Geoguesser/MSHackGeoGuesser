import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StreetView from "./components/Streetview";

class Landing extends React.Component {
  render() {
    return (
      <div>
        <h2>Landing...</h2>
      </div>
    );
  }
}

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/game" component={StreetView} />
        <Route exact path="/" component={Landing} />
      </div>
    </Router>
  );
}

export default App;
