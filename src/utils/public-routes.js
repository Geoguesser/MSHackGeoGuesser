import React from "react";
import { Router, Route } from "react-router-dom";
import Landing from "../components/Landing";

function PublicRouter() {
  return (
    <Router>
      <Route exact path="/" component={Landing} />
    </Router>
  );
}

export default PublicRouter;
