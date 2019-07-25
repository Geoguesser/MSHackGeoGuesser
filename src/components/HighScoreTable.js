import React from "react";

class HighScoreTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      ...newProps
    });
  }
  render() {
    console.log(this.state);
    return (
      <div style={{ color: "black" }}>
        <h1>Leaderboard</h1>
        <th style={{ padding: "20px,20px,20px,0px" }} scope="col">
          Rank
        </th>
        <th style={{ padding: "20px" }} scope="col">
          Display Name
        </th>
        <th style={{ padding: "20px" }} scope="col">
          Value
        </th>
        <table className="table">
          <tbody>
            {this.state.scores &&
              this.state.scores
                .sort((a, b) => a.Position > b.Position)
                .map((score, index) => {
                  const { DisplayName, StatValue } = score;
                  return (
                    <tr key={index}>
                      <th scope="row">{index}</th>
                      <td>{DisplayName}</td>
                      <td>{StatValue}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    );
  }

  renderTableData = () => {
    this.state.scores && this.state.scores.sort((a, b) => a.Position > b.Position);
    this.state.scores &&
      this.state.scores.map((score, index) => {
        const { PlayFabId, DisplayName, StatValue, Position } = score;
        return (
          <tr key={index}>
            <td>{DisplayName}</td>
            <td>{StatValue}</td>
            <td>{Position}</td>
            <td>{PlayFabId}</td>
          </tr>
        );
      });
  };
}

export default HighScoreTable;
