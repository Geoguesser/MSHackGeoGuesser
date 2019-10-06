import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableHeadCell,
  TableBody,
  TableStandardCell,
  Navbar,
  Card,
  Header,
  Row,
  Container,
  Column,
  NavbarEnd,
  NavbarItem,
  Button,
  Spinner
} from "../common";
import bronzeTrophy from "../assets/bronze-trophy.svg";
import goldTrophy from "../assets/gold-trophy.svg";
import silverTrophy from "../assets/silver-trophy.svg";
import { useLeaderboard } from "../hooks/leaderboard";

function Leaderboard({ history, totalScore, setTotalScore, setRoundNumber }) {
  function onClickPlayAgain() {
    setRoundNumber(1);
    setTotalScore([]);
    history.push("/game");
  }

  const { loading, leaderboard, playerRank } = useLeaderboard(totalScore);
  if (loading) {
    return <Spinner fullpage />;
  } else {
    const scoresList = playerRank ? [...leaderboard, playerRank] : leaderboard;

    // this order matters
    const firstPlace = scoresList && scoresList.length > 0 ? scoresList.shift() : undefined;
    const secondPlace = scoresList && scoresList.length > 0 ? scoresList.shift() : undefined;
    const thirdPlace = scoresList && scoresList.length > 0 ? scoresList.shift() : undefined;
    return (
      <>
        <Navbar brandText="Geoguesser" brandLink="/">
          <NavbarEnd>
            <NavbarItem>
              <Button onClick={onClickPlayAgain}>Play again?</Button>
            </NavbarItem>
          </NavbarEnd>
        </Navbar>
        <Container>
          <Row>
            <Header as="h1">Leaderboard</Header>
          </Row>
          <Row centered>
            <Header as="h3">Top 3</Header>
          </Row>
          <Row>
            {secondPlace && (
              <Column align="center" vertical="center">
                <Card
                  imgSize="medium"
                  cardTitle={secondPlace.DisplayName}
                  cardTopImg={silverTrophy}
                  altText="First Place Trophy"
                  subtitle={secondPlace.StatValue}
                />
              </Column>
            )}
            {firstPlace && (
              <Column align="center" vertical="center">
                <Card
                  imgSize="large"
                  cardTitle={firstPlace.DisplayName}
                  cardTopImg={goldTrophy}
                  altText="First Place Trophy"
                  subtitle={firstPlace.StatValue}
                />
              </Column>
            )}
            {thirdPlace && (
              <Column align="center" vertical="center">
                <Card
                  imgSize="medium"
                  cardTitle={thirdPlace.DisplayName}
                  cardTopImg={bronzeTrophy}
                  altText="First Place Trophy"
                  subtitle={thirdPlace.StatValue}
                />
              </Column>
            )}
          </Row>
        </Container>
        {scoresList && scoresList.length > 0 && (
          <Container>
            <Row centered>
              <Header as="h3">Ranks</Header>
            </Row>
            <Row centered>
              <Column width="one-half">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeadCell alignment="center">Rank</TableHeadCell>
                      <TableHeadCell alignment="left">Username</TableHeadCell>
                      <TableHeadCell alignment="center">Score</TableHeadCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scoresList.map((score, index) => (
                      <TableRow>
                        <TableHeadCell alignment="center">{index + 4}</TableHeadCell>
                        <TableStandardCell alignment="left">{score.DisplayName}</TableStandardCell>
                        <TableStandardCell alignment="center">{score.StatValue}</TableStandardCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Column>
            </Row>
          </Container>
        )}
      </>
    );
  }
}

export default Leaderboard;
