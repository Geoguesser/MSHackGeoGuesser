import React from "react";
import { storiesOf } from "@storybook/react";
import { Container, Row, Column } from "../src/common";

function ContainerStory() {
  return (
    <Container>
      <div style={{ backgroundColor: "purple", height: 100, width: "100%" }}>
        Container (100 height)
      </div>
    </Container>
  );
}

function RowStory() {
  return (
    <Container>
      <Row>
        <div style={{ backgroundColor: "purple", height: 100, width: "100%" }}>Row 1</div>
      </Row>
      <Row>
        <Column align="center">
          <div style={{ backgroundColor: "red", width: "50px" }}>hello</div>
        </Column>
        <Column align="right">
          <div style={{ backgroundColor: "red", width: "50px" }}>hello</div>
        </Column>
        <Column>Col 2</Column>
      </Row>
    </Container>
  );
}

storiesOf("Layout", module)
  .add("Container", () => <ContainerStory />)
  .add("Row", () => <RowStory />);
