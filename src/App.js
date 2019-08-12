import React from "react";

const PrivateRouter = React.lazy(() => import("./ "));

// import React from "react";
// import GeoGuesserRouter from "./Router";
// import { login } from "./utils/auth";

// class App extends React.Component {
//   state = {
//     totalScore: [],
//     isAuthenticated: false,
//     currentRound: 1
//   };

//   componentDidMount() {
//     this.getUser();
//   }

//   getUser = () => {
//     const username = localStorage.getItem("gs_username");
//     this.setState({ isAuthenticated: !!username });
//   };

//   // checkLoggedInUser = () => {
//   //   const username = localStorage.getItem(`gs_username`);
//   //   if (username) {
//   //     try {
//   //       login(username, () => {
//   //         this.setState({ isAuthenticated: true });
//   //       });
//   //     } catch (e) {
//   //       this.setState({ isAuthenticated: false });
//   //     }
//   //   }
//   // };

//   setTotalScore = totalScore => {
//     this.setState({ totalScore });
//   };

//   incrementRound = () => {
//     this.setState(({ currentRound }) => ({
//       currentRound: currentRound + 1
//     }));
//   };

//   render() {
//     const { totalScore, isAuthenticated, currentRound } = this.state;
//     return (
//       <GeoGuesserRouter
//         currentRound={currentRound}
//         isAuthenticated={isAuthenticated}
//         totalScore={totalScore}
//         incrementRound={this.incrementRound}
//         setTotalScore={this.setTotalScore}
//       />
//     );
//   }
// }

// export default App;
