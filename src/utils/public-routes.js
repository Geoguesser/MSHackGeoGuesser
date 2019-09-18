import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "../components/Landing";

function PublicRouter() {
  return (
    <Router>
      <Route exact path="/" render={routeProps => <Landing />} />
    </Router>
  );
}

export default PublicRouter;
