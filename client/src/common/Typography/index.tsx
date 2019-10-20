import React from "react";
import classnames from "classnames";
import { getTextAlign } from "../utils/text";
import { HORIZONTAL_ALIGNMENT } from "../../utils/types";
import styles from "./typography.module.css";

type ComponentDef = "p" | "h1" | "a" | "h3";

type DefaultProps = { as: ComponentDef; textAlign: HORIZONTAL_ALIGNMENT };

const defaultProps: DefaultProps = {
  as: "h1",
  textAlign: HORIZONTAL_ALIGNMENT.LEFT
};

type HeaderProps = {
  children: React.ReactNode;
  className?: string;
  textAlign?: HORIZONTAL_ALIGNMENT;
  as?: ComponentDef;
  href?: string;
} & typeof defaultProps;

function getElementType(
  Component: React.FunctionComponent<HeaderProps>,
  props: HeaderProps
): ComponentDef {
  const { defaultProps = {} } = Component;

  if (props.as && props.as !== defaultProps.as) {
    return props.as;
  }

  if (props.href) {
    return "a";
  }

  return defaultProps.as || "p";
}

function Header(props: HeaderProps) {
  const { children, className, textAlign } = props;
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

Header.defaultProps = defaultProps;

export { Header };
