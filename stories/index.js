import React from "react";
import { storiesOf } from "@storybook/react";
import { Button } from "../src/common";

function ButtonStory() {
  return (
    <div>
      <div style={{ padding: 10 }}>
        <Button>Normal Button</Button>
      </div>
      <div style={{ padding: 10 }}>
        <Button size="small">Small Button</Button>
      </div>
      <div style={{ padding: 10 }}>
        <Button size="large">Large Button</Button>
      </div>
      <div style={{ padding: 10 }}>
        <Button isFullWidth>Full Width Button</Button>
      </div>
      <div style={{ padding: 10 }}>
        <Button size="large" isFullWidth>
          Full Width & Large Button
        </Button>
      </div>
    </div>
  );
}

storiesOf("Button", module).add("Standard", () => <ButtonStory />);
