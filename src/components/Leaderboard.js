import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../common";
import HighScoreTable from "./HighScoreTable";
import Navbar from "./Navbar";
import "../style/leaderboard.scss";
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
    const fullLeaderboard = playerRank ? [...leaderboard, playerRank] : leaderboard;
    return (
      <>
        <Navbar />
        <div className="leaderboard-container">
          <h1 className="title">Leaderboard</h1>
          <HighScoreTable scores={fullLeaderboard} />
          <Button onClick={onClickPlayAgain}>Play again?</Button>
        </div>
      </>
    );
  }
}

export default Leaderboard;
