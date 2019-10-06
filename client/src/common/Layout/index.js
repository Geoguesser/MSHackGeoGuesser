import React from "react";
import classnames from "classnames";
import { getTextAlign, getContentAlign, getVerticalAlign } from "../utils/text";
import styles from "./layout.module.css";

const SIZES = {
  ONE_THIRD: "one-third",
  ONE_HALF: "one-half",
  ONE_QUARTER: "one-quarter"
};

const ALIGN = {
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right"
};

function Container({ children, fullHeight, verticalAlign }) {
  const className = classnames(styles["container"], {
    [styles["container--full-height"]]: fullHeight,
    [styles["container--vertical-center"]]: verticalAlign === ALIGN.CENTER
  });
  return <div className={className}>{children}</div>;
}

function Row({ children, centered = false }) {
  const className = classnames(styles["row"], {
    [styles["row--centered"]]: centered
  });
  return <div className={className}>{children}</div>;
}

function Column({ children, width, textAlign, align }) {
  const className = classnames(styles["column"], {
    [styles["column--one-third"]]: width === SIZES.ONE_THIRD,
    [styles["column--one-half"]]: width === SIZES.ONE_HALF,
    [styles["column--one-quarter"]]: width === SIZES.ONE_QUARTER,
    ...getTextAlign(textAlign),
    ...getContentAlign(align),
    ...getVerticalAlign(align)
  });
  return <div className={className}>{children}</div>;
}

export { Container, Row, Column };
