import { configure } from "@storybook/react";
// global variables & styles
import "../src/common/styles/global.css";
import "../src/common/styles/variables.css";

function loadStories() {
  require("../stories/button.js");
  require("../stories/layout.js");
  require("../stories/typography.js");
  require("../stories/input.js");
  require("../stories/navbar.js");
  require("../stories//card.js");
  // You can require as many stories as you need.
}

configure(loadStories, module);
