import React from "react";
import RouterComponent from "./router";
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

  const gameProps: IGameProps = {
    totalScore,
    setTotalScore,
    roundNumber,
    setRoundNumber
  };
  return (
    <React.Suspense fallback={<Spinner fullpage />}>
      <RouterComponent {...gameProps} />
    </React.Suspense>
  );
}

export default App;
