import React from "react";
import { RouteComponentProps } from "react-router-dom";
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
import { HORIZONTAL_ALIGNMENT, VERTICAL_ALIGNMENT, COLUMN_SIZE, SIZE } from "../utils/types";
import { useLeaderboard } from "../hooks/leaderboard";

interface LeaderboardProps extends RouteComponentProps {
  totalScore: number[];
  setTotalScore: React.Dispatch<React.SetStateAction<number[]>>;
  setRoundNumber: React.Dispatch<React.SetStateAction<number>>;
}

function Leaderboard({
  history,
  totalScore,
  setTotalScore,
  setRoundNumber
}: LeaderboardProps): JSX.Element {
  const { loading, leaderboard, playerRank } = useLeaderboard(totalScore);
  const onClickPlayAgain = (): void => {
    setRoundNumber(1);
    setTotalScore([]);
    history.push("/game");
  };

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
              <Column
                alignHorizontally={HORIZONTAL_ALIGNMENT.CENTER}
                alignVertically={VERTICAL_ALIGNMENT.CENTER}
              >
                <Card
                  imgSize="medium"
                  cardTitle={secondPlace.DisplayName}
                  cardTopImg={silverTrophy}
                  altText="First Place Trophy"
                  subtitle={secondPlace.StatValue.toString()}
                />
              </Column>
            )}
            {firstPlace && (
              <Column
                alignHorizontally={HORIZONTAL_ALIGNMENT.CENTER}
                alignVertically={VERTICAL_ALIGNMENT.CENTER}
              >
                <Card
                  imgSize="large"
                  cardTitle={firstPlace.DisplayName}
                  cardTopImg={goldTrophy}
                  altText="First Place Trophy"
                  subtitle={firstPlace.StatValue.toString()}
                />
              </Column>
            )}
            {thirdPlace && (
              <Column
                alignHorizontally={HORIZONTAL_ALIGNMENT.CENTER}
                alignVertically={VERTICAL_ALIGNMENT.CENTER}
              >
                <Card
                  imgSize="medium"
                  cardTitle={thirdPlace.DisplayName}
                  cardTopImg={bronzeTrophy}
                  altText="First Place Trophy"
                  subtitle={thirdPlace.StatValue.toString()}
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
              <Column width={COLUMN_SIZE.ONE_HALF}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeadCell alignment={HORIZONTAL_ALIGNMENT.CENTER}>Rank</TableHeadCell>
                      <TableHeadCell alignment={HORIZONTAL_ALIGNMENT.LEFT}>Username</TableHeadCell>
                      <TableHeadCell alignment={HORIZONTAL_ALIGNMENT.CENTER}>Score</TableHeadCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scoresList.map((score, index) => (
                      <TableRow>
                        <TableHeadCell alignment={HORIZONTAL_ALIGNMENT.CENTER}>
                          {index + 4}
                        </TableHeadCell>
                        <TableStandardCell alignment={HORIZONTAL_ALIGNMENT.LEFT}>
                          {score.DisplayName}
                        </TableStandardCell>
                        <TableStandardCell alignment={HORIZONTAL_ALIGNMENT.CENTER}>
                          {score.StatValue}
                        </TableStandardCell>
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
