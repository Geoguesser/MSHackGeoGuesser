import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

interface CommonProps {
  children: React.ReactNode;
}

interface NavbarProps extends CommonProps {
  brandText: string;
  brandLink?: string;
}

interface NavbarItemProps extends CommonProps {
  link?: string;
}

interface NavbarStartProps extends CommonProps {}

interface NavbarEndProps extends CommonProps {}

function Navbar({ brandText = "Geoguesser", brandLink, children }: NavbarProps): JSX.Element {
  return (
    <nav className={styles["navbar"]} role="navigation" aria-label="main navigation">
      <div className={styles["navbar-brand"]}>
        {brandLink ? (
          <Link className={styles["navbar-item"]} to={brandLink}>
            <h3>{brandText}</h3>
          </Link>
        ) : (
          <h3 className={styles["navbar-item-nonlink"]}>{brandText}</h3>
        )}
      </div>

      <div id="navbarBasicExample" className={styles["navbar-menu"]}>
        {children}
      </div>
    </nav>
  );
}

function NavbarItem({ children, link }: NavbarItemProps): JSX.Element {
  return link ? (
    <Link to={link} className={styles["navbar-item"]}>
      {children}
    </Link>
  ) : (
    <span className={styles["navbar-item"]}>{children}</span>
  );
}

function NavbarStart({ children }: NavbarStartProps): JSX.Element {
  return <div className={styles["navbar-start"]}>{children}</div>;
}

function NavbarEnd({ children }: NavbarEndProps): JSX.Element {
  return <div className={styles["navbar-end"]}>{children}</div>;
}

export { Navbar, NavbarItem, NavbarStart, NavbarEnd };
