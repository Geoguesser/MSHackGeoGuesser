import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

function Navbar({ brandText = "Geoguesser", brandLink, children }) {
  return (
    <nav className={styles["navbar"]} role="navigation" aria-label="main navigation">
      <div className={styles["navbar-brand"]}>
        <Link className={styles["navbar-item"]} to={brandLink}>
          <h3>{brandText}</h3>
        </Link>
      </div>

      <div id="navbarBasicExample" className={styles["navbar-menu"]}>
        {children}
      </div>
    </nav>
  );
}

function NavbarItem({ children, link }) {
  return link ? (
    <Link className={styles["navbar-item"]}>{children}</Link>
  ) : (
    <span className={styles["navbar-item"]}>{children}</span>
  );
}

function NavbarStart({ children }) {
  return <div className={styles["navbar-start"]}>{children}</div>;
}

function NavbarEnd({ children }) {
  return <div className={styles["navbar-end"]}>{children}</div>;
}

export { Navbar, NavbarItem, NavbarStart, NavbarEnd };
