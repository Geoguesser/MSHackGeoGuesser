import React from "react";
import PrivateRouter from "./utils/private-routes";
import { withAuthentication } from "react-aad-msal";
import { authProvider } from "./utils/msalAuthProvider";
import { setUser } from "./utils/auth";

function App(props) {
  const [totalScore, setTotalScore] = React.useState([]);
  const [roundNumber, setRoundNumber] = React.useState(1);
  const gameProps = {
    totalScore,
    setTotalScore,
    roundNumber,
    setRoundNumber
  };
  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <PrivateRouter {...gameProps} />
    </React.Suspense>
  );
}

export default withAuthentication(App, {
  provider: authProvider,
  accountInfoCallback: setUser
});
