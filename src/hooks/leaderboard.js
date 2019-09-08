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
        console.log("setting leaderboard");
        setLeaderboard(res.data.Leaderboard);
      } else {
        console.log("error fetching leaderboard");
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
        console.log(`playfab ID: ${localStorage.getItem(`gs_playfabId`)} -- player`);
        const user = res.data.Leaderboard.find(
          player => player.PlayFabId === localStorage.getItem(`gs_playfabId`)
        );
        console.log(`user....${JSON.stringify(user)}`);
        if (user.Position > 10) {
          console.log(`setting player rank`);
          setPlayerRank(user);
          console.log(`player rank: ${playerRank}`);
        }
      } else {
        console.log("error fetching player leaderboard");
      }
    });
  }

  React.useEffect(() => {
    setLoading(true);
    let interval = setInterval(() => {
      console.log(`start of interval run. about to log in`);
      // figure out when to login to playfab and whether username local storage should be userfriendly name or playfab username
      login(getUser(), () => {
        console.log(`logged in. newScore: ${JSON.stringify(newScore)}`);
        if (newScore.length > 0) {
          console.log(`adding to scoreboard and fetching player rank`);
          addUserScoreToLeaderboard(newScore);
          fetchPlayerRank();
        }
        console.log(`fetching leaderboard and setting loading`);
        fetchLeaderboard();
        setLoading(false);
        console.log("end of login");
      });
      console.log(`end of interval run`);
    }, 3000);
    return () => {
      console.log("clearing interval");
      clearInterval(interval);
    };
  }, []);

  // return leaderboard, playerrank, and loading for each
  return { loading, leaderboard, playerRank };
}

export { useLeaderboard };
