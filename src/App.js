import React from "react";
import { useAuth } from "./hooks/auth";
import PrivateRouter from "./utils/private-routes";
import PublicRouter from "./utils/public-routes";

function App(props) {
  const [totalScore, setTotalScore] = React.useState([]);
  const [roundNumber, setRoundNumber] = React.useState(1);
  const gameProps = {
    totalScore,
    setTotalScore,
    roundNumber,
    setRoundNumber
  };
  const { user } = useAuth();
  console.log(user);
  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      {user ? <PrivateRouter {...gameProps} /> : <PublicRouter />}
    </React.Suspense>
  );
}

export default App;
