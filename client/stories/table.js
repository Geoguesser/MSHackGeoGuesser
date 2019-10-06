import React from "react";
import { storiesOf } from "@storybook/react";
import {
  Table,
  TableHead,
  TableRow,
  TableHeadCell,
  TableBody,
  TableStandardCell
} from "../src/common";

function TableStory() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>#</TableHeadCell>
          <TableHeadCell>First</TableHeadCell>
          <TableHeadCell>Last</TableHeadCell>
          <TableHeadCell>Username</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableHeadCell alignment="left">1</TableHeadCell>
          <TableStandardCell>Daniel</TableStandardCell>
          <TableStandardCell alignment="center">Ohn</TableStandardCell>
          <TableStandardCell>Catsby</TableStandardCell>
        </TableRow>
        <TableRow>
          <TableHeadCell>2</TableHeadCell>
          <TableStandardCell>Jeehyae</TableStandardCell>
          <TableStandardCell>Dance</TableStandardCell>
          <TableStandardCell>JinaJelly</TableStandardCell>
        </TableRow>
        <TableRow>
          <TableHeadCell>3</TableHeadCell>
          <TableStandardCell>Keevan</TableStandardCell>
          <TableStandardCell>Dance</TableStandardCell>
          <TableStandardCell>DanceParty</TableStandardCell>
        </TableRow>
        <TableRow>
          <TableHeadCell>4</TableHeadCell>
          <TableStandardCell>Cameron</TableStandardCell>
          <TableStandardCell>Smith</TableStandardCell>
          <TableStandardCell>Lapras</TableStandardCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

storiesOf("Table", module).add("Standard", () => <TableStory />);
