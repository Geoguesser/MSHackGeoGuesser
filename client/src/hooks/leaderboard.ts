import React from "react";
import { useAuth } from "./auth";
import { PlayerProfile } from "../utils/types";
import { leaderboardResolver } from "../utils/helpers";

// custom hook to provide all leaderboard functionality

interface PlayerLeaderboardEntry {
  DisplayName: string;
  PlayFabId: string;
  Position: number;
  Profile: PlayerProfile;
  StatValue: number;
}

function useLeaderboard(
  newScore: number[]
): {
  loading: boolean;
  leaderboard: PlayerLeaderboardEntry[];
  playerRank: PlayerLeaderboardEntry | null;
} {
  // const { user, login } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [leaderboard, setLeaderboard] = React.useState<PlayerLeaderboardEntry[]>([]);
  const [playerRank, setPlayerRank] = React.useState<PlayerLeaderboardEntry | null>(null);

  // basic leaderboard fetching
  const fetchLeaderboard = (): void => {
    const settings = {
      StartPosition: 0,
      MaxResultsCount: 10,
      StatisticName: leaderboardResolver()
    };
    window.PlayFabClientSDK.GetLeaderboard(settings, (res: any, err: any) => {
      if (res) {
        setLeaderboard(res.data.Leaderboard);
      } else {
        console.log("error fetching leaderboard");
      }
      setLoading(false);
    });
  };

  // update leaderboard with user score
  const addUserScoreToLeaderboard = (totalScore: number[]) => {
    window.PlayFabClientSDK.UpdatePlayerStatistics({
      Statistics: [
        {
          StatisticName: leaderboardResolver(),
          Value: totalScore.reduce((sum, num) => sum + num)
        }
      ]
    });
  };

  // fetch the player's rank if not in top 10
  const fetchPlayerRank = (): void => {
    const settings = {
      PlayFabId: localStorage.getItem(`gs_playfabId`),
      StatisticName: leaderboardResolver()
    };
    window.PlayFabClientSDK.GetLeaderboardAroundPlayer(settings, (res: any) => {
      if (res) {
        const user = res.data.Leaderboard.find(
          (player: PlayerLeaderboardEntry) =>
            player.PlayFabId === localStorage.getItem(`gs_playfabId`)
        );
        if (user.Position > 10) {
          setPlayerRank(user);
        }
      } else {
        console.log("error fetching player leaderboard");
      }
    });
  };

  React.useEffect(() => {
    setLoading(true);
    // let interval = setInterval(() => {
    //   login(user, () => {
    //     if (newScore.length > 0) {
    //       addUserScoreToLeaderboard(newScore);
    //       fetchPlayerRank();
    //     }
    //     fetchLeaderboard();
    //     setLoading(false);
    //   });
    // }, 3000);
    return () => {
      // clearInterval(interval);
    };
  }, []);

  // return leaderboard, playerrank, and loading for each
  return { loading, leaderboard, playerRank };
}

export { useLeaderboard };
