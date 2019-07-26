import React from "react";

class HighScoreTable extends React.Component {
  render() {
    const { scores, currentUserScore } = this.props;
    if(scores && currentUserScore && !scores.find(s => s.PlayFabId === currentUserScore.PlayFabId)) {
      scores.push(currentUserScore);
    }
    return (
      <div style={{ color: "black" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Display Name</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {!!scores
              ? scores
                  .sort((a, b) => a.Position > b.Position)
                  .map((score, index) => {
                    const { Position, DisplayName, StatValue } = score;
                    return (
                      <tr key={index}>
                        <th scope="row">{Position + 1}</th>
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
