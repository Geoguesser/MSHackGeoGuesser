import React from "react";
import { useAuth } from "./hooks/auth";
import PrivateRouter from "./utils/private-routes";
import PublicRouter from "./utils/public-routes";
import { Spinner } from "./common";

interface IAppState {
  totalScore: number[];
  roundNumber: number;
}

interface IGameProps extends IAppState {
  setTotalScore: React.Dispatch<React.SetStateAction<number[]>>;
  setRoundNumber: React.Dispatch<React.SetStateAction<number>>;
}

function App(): JSX.Element {
  const [totalScore, setTotalScore] = React.useState<IAppState["totalScore"]>([]);
  const [roundNumber, setRoundNumber] = React.useState<IAppState["roundNumber"]>(1);

  React.useEffect(() => {
    fetch("/auth/google");
  });

  const gameProps: IGameProps = {
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

// class App extends React.Component<{}, {}> {
//   onClick = () => {
//     window.open("http://localhost:5000/auth/google", "_self");
//   };
//   render() {
//     return <button onClick={this.onClick}>login</button>;
//   }
// }

export default App;
