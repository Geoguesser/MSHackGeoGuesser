import React from "react";

class HighScoreTable extends React.Component {
  render() {
    const { scores } = this.props;
    return (
      <div style={{ color: "black" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Display Name</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {!!scores
              ? scores
                  .sort((a, b) => a.Position > b.Position)
                  .map((score, index) => {
                    const { DisplayName, StatValue } = score;
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{DisplayName}</td>
                        <td>{StatValue}</td>
                      </tr>
                    );
                  })
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}

export default HighScoreTable;
