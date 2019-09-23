import React from "react";
import { Button, Navbar, Card, Header, Row, Col, Container, Column } from "../common";
import bronzeTrophy from "../assets/bronze-trophy.svg";
import goldTrophy from "../assets/gold-trophy.svg";
import silverTrophy from "../assets/silver-trophy.svg";
import HighScoreTable from "./HighScoreTable";
// import "../style/leaderboard.scss";
import styles from "../style/leaderboard.module.css";
import { useLeaderboard } from "../hooks/leaderboard";

function Leaderboard({ history, totalScore, setTotalScore, setRoundNumber }) {
  function onClickPlayAgain() {
    setRoundNumber(1);
    setTotalScore([]);
    history.push("/game");
  }

  const { loading, leaderboard, playerRank } = useLeaderboard(totalScore);
  if (loading) {
    return <p>Loading...</p>;
  } else {
    const scoresList = playerRank ? [...leaderboard, playerRank] : leaderboard;

    // this order matters
    const firstPlace = scoresList && scoresList.length > 0 ? scoresList.shift() : undefined;
    const secondPlace = scoresList && scoresList.length > 0 ? scoresList.shift() : undefined;
    const thirdPlace = scoresList && scoresList.length > 0 ? scoresList.shift() : undefined;
    return (
      <>
        <Navbar brandText="Geoguesser" brandLink="/" />
        <Container>
          <Row>
            <Header as="h1">Leaderboard</Header>
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
          <Row>
            <HighScoreTable scores={scoresList} />
          </Row>
        </Container>
      </>
    );
  }
}

export default Leaderboard;
