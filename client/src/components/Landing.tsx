import React from "react";
import { Container, Row, Column, Header, Button, Input } from "../common";
import { VERTICAL_ALIGNMENT, HORIZONTAL_ALIGNMENT } from "../utils/types";
import { useAuth } from "../hooks/auth";

function Landing(): JSX.Element {
  const [name, setName] = React.useState<string>("");
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const { login } = useAuth();

  function onChange(e: React.FormEvent<HTMLInputElement>): void {
    setName(e.currentTarget.value);
  }

  function loginUser(): void {
    setDisabled(true);
    login(name);
  }

  return (
    <Container fullHeight verticalAlign={VERTICAL_ALIGNMENT.CENTER}>
      <Row>
        <Column textAlign={HORIZONTAL_ALIGNMENT.CENTER}>
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
        <Column textAlign={HORIZONTAL_ALIGNMENT.LEFT}>
          <Input id="username" value={name} label="Username" center onChange={onChange} />
          <Button onClick={loginUser} disabled={!name || disabled}>
            Let's go!
          </Button>
        </Column>
      </Row>
    </Container>
  );
}

export default Landing;
