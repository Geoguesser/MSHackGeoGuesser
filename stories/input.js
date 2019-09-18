import React from "react";
import { storiesOf } from "@storybook/react";
import { Input } from "../src/common";

function InputStory() {
  return (
    <div>
      <Input label="My label" />
    </div>
  );
}

storiesOf("Form", module).add("Input", () => <InputStory />);
