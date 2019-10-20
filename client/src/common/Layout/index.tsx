import React from "react";
import classnames from "classnames";
import { getTextAlign, getContentAlign, getVerticalAlign } from "../utils/text";
import { HORIZONTAL_ALIGNMENT, VERTICAL_ALIGNMENT, COLUMN_SIZE, SIZE } from "../../utils/types";
import styles from "./layout.module.css";

interface ContainerProps {
  children: React.ReactNode;
  fullHeight?: boolean;
  verticalAlign?: VERTICAL_ALIGNMENT;
}

interface RowProps {
  children: React.ReactNode;
  centered?: boolean;
}

interface ColumnProps {
  children: React.ReactNode;
  width?: COLUMN_SIZE;
  textAlign?: HORIZONTAL_ALIGNMENT;
  alignHorizontally?: HORIZONTAL_ALIGNMENT;
  alignVertically?: VERTICAL_ALIGNMENT;
}

function Container({ children, fullHeight, verticalAlign }: ContainerProps): JSX.Element {
  const className: string = classnames(styles["container"], {
    [styles["container--full-height"]]: fullHeight,
    [styles["container--vertical-center"]]: verticalAlign === VERTICAL_ALIGNMENT.CENTER
  });
  return <div className={className}>{children}</div>;
}

function Row({ children, centered = false }: RowProps): JSX.Element {
  const className: string = classnames(styles["row"], {
    [styles["row--centered"]]: centered
  });
  return <div className={className}>{children}</div>;
}

function Column({
  children,
  width,
  textAlign = HORIZONTAL_ALIGNMENT.LEFT,
  alignHorizontally = HORIZONTAL_ALIGNMENT.LEFT,
  alignVertically = VERTICAL_ALIGNMENT.TOP
}: ColumnProps): JSX.Element {
  const className: string = classnames(styles["column"], {
    [styles["column--one-third"]]: width === COLUMN_SIZE.ONE_THIRD,
    [styles["column--one-half"]]: width === COLUMN_SIZE.ONE_HALF,
    [styles["column--one-quarter"]]: width === COLUMN_SIZE.ONE_QUARTER,
    ...getTextAlign(textAlign),
    ...getContentAlign(alignHorizontally),
    ...getVerticalAlign(alignVertically)
  });
  return <div className={className}>{children}</div>;
}

export { Container, Row, Column };
