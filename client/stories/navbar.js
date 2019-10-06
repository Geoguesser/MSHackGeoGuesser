import React from "react";
import { storiesOf } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "../src/common";

function NavbarStory() {
  return (
    <Router>
      <Navbar />
    </Router>
  );
}

storiesOf("Navbar", module).add("Standard", () => <NavbarStory />);
