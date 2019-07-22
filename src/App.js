import './style/landing.scss';
import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className="App">
        <header>
            <h1>MS Geoguesser</h1>
          </header>
          <div className="viewport">
            <h2 className="start-btn">Play Geoguesser</h2>
          </div>
      </div>
    );
  }
  }
