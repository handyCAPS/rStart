// @flow
import React from 'react';
import logo from './logo.svg';
import './App.css';

import Form from './components/Form/Form';

type Props = {};

type State = {};

class App extends React.Component<Props, State> {
  render() {
    return (
      <div className="outerWrap">
        <h1 className="header--main">RStart</h1>
        <div className="body">
          <div className="third"></div>
          <div className="third">
            <Form />
          </div>
          <div className="third"></div>
        </div>
      </div>
    );
  }
}

export default App;
