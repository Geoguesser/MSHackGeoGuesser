import React from "react";
import { storiesOf } from "@storybook/react";
import { Header } from "../src/common";

function HeaderStory() {
  return (
    <div>
      <Header as="h1">Heading 1</Header>
      <Header as="h2">Heading 2</Header>
      <Header as="h3">Heading 3</Header>
      <Header as="h4">Heading 4</Header>
      <Header as="h5">Heading 5</Header>
    </div>
  );
}

storiesOf("Typography", module).add("Header", () => <HeaderStory />);
