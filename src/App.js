import React, { Component } from 'react';
import Grid from './components/Grid';
import 'normalize.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Grid size="16" />
      </div>
    );
  }
}

export default App;
