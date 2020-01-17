import * as React from "react";
import styles from "./footer.module.css";

interface FooterProps {
  children?: React.ReactNode;
}

function Footer(props: FooterProps) {
  return <div className={styles["footer"]}>{props.children}</div>;
}

export default Footer;
