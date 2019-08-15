import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "../components/Landing";
import LoginForm from "../components/LoginForm";

function PublicRouter() {
  return (
    <Router>
      <Route
        exact
        path="/"
        render={routeProps => (
          <Landing>
            <LoginForm />
          </Landing>
        )}
      />
    </Router>
  );
}

export default PublicRouter;
