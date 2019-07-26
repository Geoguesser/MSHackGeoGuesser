import React from "react";
import { playFabLogin } from "../utils/helpers";
import "../style/landing.scss";

class Landing extends React.Component {
  state = {
    name: "",
    isDisabled: false
  };

  onChangeName = e => {
    this.setState({ name: e.currentTarget.value });
  };

  loginUser = async () => {
    this.toggleButtonDisabled();

    playFabLogin(this.state.name, res => {
      if (res && res.error === "NameNotAvailable") {
        alert("Name is not available, please enter again.");
        this.setState({ name: "" });
      } else {
        this.props.history.push("/game");
      }
    });

    // enable button if the above failed
    this.toggleButtonDisabled();
  };

  toggleButtonDisabled = () => {
    this.setState(({ isDisabled }) => ({
      isDisabled: !isDisabled
    }));
  };

  render() {
    const { name, isDisabled } = this.state;
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
                onChange={this.onChangeName}
                placeholder="Enter your name"
              />
            </div>

            <button onClick={this.loginUser} disabled={isDisabled} className="name-button">
              Let's go{" "}
              <span role="img" aria-label="airplane-departure-emoji">
                🛫
              </span>
            </button>
          </div>
        </div>
        {/* <div className="initialContainer">
          <label htmlFor="initials">Enter initials</label>
          <input id="initials" type="text" onChange={this.onChangeInitials} value={initials} />
        </div>
        <div onClick={this.loginUser} className="start-btn">
          Play Geoguesser
        </div> */}
      </div>
    );
  }
}

export default Landing;
