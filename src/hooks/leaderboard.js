import React from "react";
import { leaderboardResolver } from "../utils/helpers";
import { login, getUser } from "../utils/auth";

// custom hook to provide all leaderboard functionality

function useLeaderboard(newScore) {
  const [loading, setLoading] = React.useState(true);
  const [leaderboard, setLeaderboard] = React.useState(null);
  const [playerRank, setPlayerRank] = React.useState(null);

  // basic leaderboard fetching
  function fetchLeaderboard() {
    const settings = {
      StartPosition: 0,
      MaxResultsCount: 10,
      StatisticName: leaderboardResolver()
    };
    window.PlayFabClientSDK.GetLeaderboard(settings, (res, err) => {
      if (res) {
        setLeaderboard(res.data.Leaderboard);
      } else {
      }
      setLoading(false);
    });
  }

  // update leaderboard with user score
  function addUserScoreToLeaderboard(totalScore) {
    window.PlayFabClientSDK.UpdatePlayerStatistics({
      Statistics: [
        {
          StatisticName: leaderboardResolver(),
          Value: totalScore.reduce((sum, num) => sum + num)
        }
      ]
    });
  }

  // fetch the player's rank if not in top 10
  function fetchPlayerRank() {
    const settings = {
      PlayFabId: localStorage.getItem(`gs_playfabId`),
      StatisticName: leaderboardResolver()
    };
    window.PlayFabClientSDK.GetLeaderboardAroundPlayer(settings, res => {
      if (res) {
        const user = res.data.Leaderboard.find(
          player => player.PlayFabId === localStorage.getItem(`gs_playfabId`)
        );
        if (user.Position > 10) {
          setPlayerRank(user);
        }
      } else {
        console.log("error fetching player leaderboard");
      }
    });
  }

  React.useEffect(() => {
    setLoading(true);
    let interval = setInterval(() => {
      login(getUser(), () => {
        if (newScore.length > 0) {
          addUserScoreToLeaderboard(newScore);
          fetchPlayerRank();
        }
        fetchLeaderboard();
        setLoading(false);
      });
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // return leaderboard, playerrank, and loading for each
  return { loading, leaderboard, playerRank };
}

export { useLeaderboard };
