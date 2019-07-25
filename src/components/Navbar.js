import React from "react";
import { Link } from "react-router-dom";
import "../style/navbar.scss";

function Navbar(props) {
  console.log(props.children.length);
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <h1 className="navbar-title">Geoguesser</h1>
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">{props.children}</div>
      </div>
    </nav>
  );
}

export default Navbar;
