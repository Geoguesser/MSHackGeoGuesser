import React from "react";

import "../style/landing.scss";

function Landing(props) {
  return (
    <div className="landing-page">
      <div className="center-container">
        <h1 className="page-title">Geoguesser</h1>
      </div>
      <div className="center-container">
        <div className="container-content">{props.children}</div>
      </div>
    </div>
  );
}

export default Landing;
