import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Navbar, NavbarEnd, NavbarItem, Button, Container, Header, Column, Row } from "../common";
import { AuthenticationContext } from "./AuthProvider";
import { VERTICAL_ALIGNMENT } from "../utils/types";

function Home({ history }: RouteComponentProps) {
  const { logout, user } = React.useContext(AuthenticationContext);

  const onClickLogout = () => {
    logout();
  };

  const onClickStart = () => {
    history.push("/game");
  };

  const onClickLeaderboard = () => {
    history.push("/leaderboard");
  };

  return (
    <>
      <Navbar brandLink="/">
        <NavbarEnd>
          <NavbarItem>
            <Button onClick={onClickLogout}>Logout</Button>
          </NavbarItem>
        </NavbarEnd>
      </Navbar>
      <Container fullHeight>
        <Header>Welcome {user && user.username},</Header>
        <Column alignVertically={VERTICAL_ALIGNMENT.CENTER}>
          <Row centered>
            <Button onClick={onClickStart}>Start game!</Button>
          </Row>
          <Row centered>
            <Button onClick={onClickLeaderboard}>View Leaderboard</Button>
          </Row>
        </Column>
      </Container>
    </>
  );
}

export default withRouter(Home);
