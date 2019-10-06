import React from "react";
import { useAuth } from "./hooks/auth";
import PrivateRouter from "./utils/private-routes";
import PublicRouter from "./utils/public-routes";
import { Spinner } from "./common";

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
  return (
    <React.Suspense fallback={<Spinner fullpage />}>
      {user ? <PrivateRouter {...gameProps} /> : <PublicRouter />}
    </React.Suspense>
  );
}

export default App;
