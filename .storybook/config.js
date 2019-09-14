import { configure } from "@storybook/react";
// global variables & styles
import "../src/common/styles/global.css";

function loadStories() {
  require("../stories/index.js");
  // You can require as many stories as you need.
}

configure(loadStories, module);
