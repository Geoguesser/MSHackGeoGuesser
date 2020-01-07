import React from "react";
import { Container, Row, Column, Header, GoogleButton } from "../common";
import { VERTICAL_ALIGNMENT, HORIZONTAL_ALIGNMENT } from "../utils/types";
import { urlResolver } from "../utils/url-resolver";
import africa from "../assets/places/africa_continent.svg";
import asia from "../assets/places/asia_continent.svg";
import america from "../assets/places/america_continent.svg";
import europe from "../assets/places/europe_continent.svg";
import oceania from "../assets/places/oceania_continent.svg";

const continents = [africa, asia, america, europe, oceania];

function Landing(): JSX.Element {
  const [username, setUsername] = React.useState<string>("");

  function loginUser(): void {
    window.open(`${urlResolver()}/auth/google`, "_self");
  }

  const getApi = () => {
    fetch("/api", { credentials: "include" });
  };

  const logout = () => {
    fetch("/auth/logout", { credentials: "include" });
  };

  const testTwo = () => {
    fetch(`${urlResolver()}/test`);
  };

  const test = () => {
    fetch(`${urlResolver()}/api/user`, { credentials: "include" });
  };

  const randomIndex = Math.floor(Math.random() * continents.length);

  return (
    <Container fullHeight verticalAlign={VERTICAL_ALIGNMENT.CENTER}>
      <Row>
        <Column>
          <Header textAlign={HORIZONTAL_ALIGNMENT.CENTER} as="h1">
            Geoguesser
          </Header>
          <Header textAlign={HORIZONTAL_ALIGNMENT.CENTER} as="h3">
            The game that takes you across the planet.{" "}
            <span role="img" aria-label="planet">
              🌎
            </span>
          </Header>
        </Column>
      </Row>
      <Row>
        <Column textAlign={HORIZONTAL_ALIGNMENT.CENTER}>
          <img src={continents[randomIndex]} alt="Seatle Picture" height={500} />
        </Column>
      </Row>
      <Row>
        <Column alignHorizontally={HORIZONTAL_ALIGNMENT.CENTER}>
          <GoogleButton onClick={loginUser} />
        </Column>
        <Column alignHorizontally={HORIZONTAL_ALIGNMENT.CENTER}>
          <button onClick={test}>test 1</button>
        </Column>
        <Column alignHorizontally={HORIZONTAL_ALIGNMENT.CENTER}>
          <button onClick={testTwo}>test 2</button>
        </Column>
      </Row>
    </Container>
  );
}

export default Landing;
