import React from "react";
import { Container, Row, Column, Header, Button, Input } from "../common";

import "../style/landing.scss";

function Landing() {
  return (
    <Container fullHeight verticalAlign="center">
      <Row>
        <Column textAlign="center">
          <Header as="h1">Geoguesser</Header>
          <Header as="h3">
            The game that takes you across the planet.{" "}
            <span role="img" aria-label="planet">
              🌎
            </span>
          </Header>
        </Column>
      </Row>
      <Row>
        <Column textAlign="center">
          <Input label="Username" center />
          <Button>Let's go!</Button>
        </Column>
      </Row>
    </Container>
    // <>
    //   <div className="landing-page">
    //     <div className="center-container">
    //       <h1 className="page-title">Geoguesser</h1>
    //     </div>
    //     <div className="center-container">
    //       <div className="container-content">{props.children}</div>
    //     </div>
    //   </div>
    //   <div className="">
    //     <div className="center-container">
    //       <h1 className="page-title">Geoguesser</h1>
    //     </div>
    //     <div className="center-container">
    //       <div className="container-content">{props.children}</div>
    //     </div>
    //   </div>
    // </>
  );
}

export default Landing;
