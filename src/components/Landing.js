import React from "react";
import { Container, Row, Column, Header, Button, Input } from "../common";
import { useAuth } from "../hooks/auth";

function Landing() {
  const [name, setName] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const { login } = useAuth();

  function onChange(e) {
    setName(e.currentTarget.value);
  }

  function loginUser() {
    setDisabled(true);
    login(name, res => {
      if (res && res.error === "NameNotAvailable") {
        alert("Name is not available, please enter again.");
        this.setState({ name: "" });
      }
    });
  }

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
          <Input label="Username" center onChange={onChange} />
          <Button onClick={loginUser} disabled={!name || disabled}>
            Let's go!
          </Button>
        </Column>
      </Row>
    </Container>
  );
}

export default Landing;
