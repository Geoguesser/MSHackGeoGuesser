import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing">
      <Link className="start-btn" to="/game">
        Play Geoguesser
      </Link>
    </div>
  );
};

export default Landing;
