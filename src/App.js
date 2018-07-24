import React, { Component } from 'react';

import Header from './components/header/Header';
import Main from './components/main';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container" style={{width:'50%'}}>
        <Header></Header>
        <Main></Main>
      </div>
    );
  }
}

export default App;
