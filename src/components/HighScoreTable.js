import React from "react";

class HighScoreTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        };
    }

    componentWillReceiveProps(newProps) {
        console.log(`inside componentWillReceiveProps: ${JSON.stringify(newProps)}`);
        this.setState({
            ...newProps
        });
    }

    render = () => {
        return (<div style={{ color: 'black' }}>
            <h1>Leaderboard</h1>
            <h2>
                <th>Rank</th>
                <th>Display Name</th>
                <th>Value</th>
            </h2>
            <table>
                <tbody>
                    {this.state.scores.map((score, index) => {
                        const { DisplayName, StatValue, Position } = score;
                        return (
                            <tr key={index}>
                                <td>{Position}</td>
                                <td>{DisplayName}</td>
                                <td>{StatValue}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>)
    }

    renderTableData = () => {
        this.state.scores.sort((a, b) => a.Position > b.Position);
        this.state.scores.map((score, index) => {
            const { PlayFabId, DisplayName, StatValue, Position } = score;
            console.log(`rendering row: ${JSON.stringify(score)}`);
            return (
                <tr key={index}>
                    <td>{DisplayName}</td>
                    <td>{StatValue}</td>
                    <td>{Position}</td>
                    <td>{PlayFabId}</td>
                </tr>
            )
        });
    }
}

export default HighScoreTable;
