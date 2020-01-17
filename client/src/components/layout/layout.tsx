import * as React from "react";
import classnames from "classnames";
import { ALIGNMENT } from "../../types/enums";
import styles from "./layout.module.css";
import Header from "../header/header";
import Footer from "../footer/footer";

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
  displayColumns?: boolean;
  vAlignment?: ALIGNMENT;
  hAlignment?: ALIGNMENT;
  showHeader?: boolean;
  renderFooter?: React.ReactNode;
}

function Layout(props: LayoutProps) {
  const contentClasses = classnames(styles["content"], props.className, {
    [styles["content-with-footer"]]: props.renderFooter
  });
  return (
    <div className={styles["layout"]}>
      <Header />
      <div className={contentClasses}>{props.children}</div>
      {props.renderFooter ? <Footer>{props.renderFooter}</Footer> : null}
    </div>
  );
}

Layout.defaultProps = {
  showHeader: true
};

export default Layout;
