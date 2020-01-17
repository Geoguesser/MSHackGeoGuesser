import * as React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

interface HeaderProps {}

function Header(props: HeaderProps) {
  return (
    <div className={styles["header"]}>
      <h1 className={styles["title"]}>
        <Link to="/">RYOKO (旅行)</Link>
      </h1>
    </div>
  );
}

export default Header;
