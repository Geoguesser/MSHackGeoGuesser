import React from "react";
import { storiesOf } from "@storybook/react";
import { Card } from "../src/common";

function CardStory() {
  return (
    <div>
      <Card cardTitle="Card Title" />
    </div>
  );
}

storiesOf("Card", module).add("Standard", () => <CardStory />);
