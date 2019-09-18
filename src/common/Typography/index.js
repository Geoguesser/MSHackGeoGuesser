import React from "react";
import classnames from "classnames";
import { getTextAlign } from "../utils/text";
import styles from "./typography.module.css";

function getElementType(Component, props) {
  const { defaultProps = {} } = Component;

  if (props.as && props.as !== defaultProps.as) {
    return props.as;
  }

  if (props.href) {
    return "a";
  }

  return defaultProps.as || "p";
}

function Header(props) {
  const { children, className, textAlign, as } = props;
  const classes = classnames(
    styles["header"],
    {
      ...getTextAlign(textAlign)
    },
    className
  );

  const Element = getElementType(Header, props);

  return <Element className={classes}>{children}</Element>;
}

Header.defaultProps = {
  as: "h1"
};

export { Header };
