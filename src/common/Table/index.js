import React from "react";
import classnames from "classnames";
import { getTextAlign } from "../utils/text";
import styles from "./table.module.css";

function Table({ children }) {
  return <table className={styles["table"]}>{children}</table>;
}

function TableHead({ children }) {
  return <thead className={styles["table-head"]}>{children}</thead>;
}

function TableRow({ children }) {
  return <tr className={styles["table-row"]}>{children}</tr>;
}

function TableHeadCell({ children, alignment }) {
  const classes = classnames(styles["header-cell"], {
    ...getTextAlign(alignment)
  });
  return <th className={classes}>{children}</th>;
}

function TableBody({ children }) {
  return <tbody className={styles["table-body"]}>{children}</tbody>;
}

function TableStandardCell({ children, alignment }) {
  const classes = classnames(styles["standard-cell"], {
    ...getTextAlign(alignment)
  });
  return <td className={classes}>{children}</td>;
}

export { Table, TableHead, TableRow, TableHeadCell, TableBody, TableStandardCell };
