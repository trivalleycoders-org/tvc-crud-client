import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import './style.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Button bsStyle="primary">Get Data</Button>
      </div>
    );
  }
}

export default App;
