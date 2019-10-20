import React from "react";
import classnames from "classnames";
import { getTextAlign } from "../utils/text";
import styles from "./table.module.css";
import { HORIZONTAL_ALIGNMENT } from "../../utils/types";

interface CommonProps {
  children: React.ReactNode;
}
interface TableProps extends CommonProps {}
interface TableHeadProps extends CommonProps {}
interface TableRow extends CommonProps {}
interface TableHeadCell extends CommonProps {
  alignment: HORIZONTAL_ALIGNMENT;
}
interface TableBodyProps extends CommonProps {}
interface TableStandardCellProps extends CommonProps {
  alignment: HORIZONTAL_ALIGNMENT;
}

function Table({ children }: TableProps): JSX.Element {
  return <table className={styles["table"]}>{children}</table>;
}

function TableHead({ children }: TableHeadProps): JSX.Element {
  return <thead className={styles["table-head"]}>{children}</thead>;
}

function TableRow({ children }: TableRow): JSX.Element {
  return <tr className={styles["table-row"]}>{children}</tr>;
}

function TableHeadCell({ children, alignment }: TableHeadCell): JSX.Element {
  const classes: string = classnames(styles["header-cell"], {
    ...getTextAlign(alignment)
  });
  return <th className={classes}>{children}</th>;
}

function TableBody({ children }: TableBodyProps): JSX.Element {
  return <tbody className={styles["table-body"]}>{children}</tbody>;
}

function TableStandardCell({ children, alignment }: TableStandardCellProps): JSX.Element {
  const classes: string = classnames(styles["standard-cell"], {
    ...getTextAlign(alignment)
  });
  return <td className={classes}>{children}</td>;
}

export { Table, TableHead, TableRow, TableHeadCell, TableBody, TableStandardCell };
