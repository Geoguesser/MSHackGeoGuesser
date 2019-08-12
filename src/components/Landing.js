import React from "react";
import { useAuth } from "../context/auth";
import "../style/landing.scss";

function Landing(props) {
  const [name, setName] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);

  const { login } = useAuth();

  console.log(login.toString());

  const changeName = e => {
    setName(e.currentTarget.value);
  };

  const loginUser = () => {
    setDisabled(true);
    login(name, res => {
      if (res && res.error === "NameNotAvailable") {
        alert("Name is not available, please enter again.");
        this.setState({ name: "" });
      } else {
        console.log("next page please?");
        // props.history.push("/game");
      }
    });
  };

  return (
    <div className="landing-page">
      <div className="center-container">
        <h1 className="page-title">Geoguesser</h1>
        <div className="container-content">
          <div className="name-input-container">
            <label htmlFor="name-input" className="visuallyhidden">
              Enter name
            </label>
            <input
              type="text"
              id="name-input"
              value={name}
              onChange={changeName}
              placeholder="Enter your name"
            />
          </div>

          <button onClick={loginUser} disabled={disabled} className="name-button">
            Let's go{" "}
            <span role="img" aria-label="airplane-departure-emoji">
              🛫
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// class Landing extends React.Component {
//   state = {
//     name: "",
//     isDisabled: false
//   };

//   onChangeName = e => {
//     this.setState({ name: e.currentTarget.value });
//   };

//   loginUser = async () => {
//     this.toggleButtonDisabled();

//     login(this.state.name, res => {
//       if (res && res.error === "NameNotAvailable") {
//         alert("Name is not available, please enter again.");
//         this.setState({ name: "" });
//       } else {
//         console.log("next page please?");
//         this.props.history.push("/game");
//       }
//     });

//     // enable button if the above failed
//     this.toggleButtonDisabled();
//   };

//   toggleButtonDisabled = () => {
//     this.setState(({ isDisabled }) => ({
//       isDisabled: !isDisabled
//     }));
//   };

//   render() {
//     console.log(this.props);
//     const { name, isDisabled } = this.state;
//     return null;
//   }
// }

export default Landing;
