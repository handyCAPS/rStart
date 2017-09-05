// @flow
import React from 'react';

import './App.css';

import LinkForm from './components/LinkForm/LinkForm';

import firebase from './firebase';

type Props = {};

type State = {};

class App extends React.Component<Props, State> {

	constructor() {
		super();

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleFormSubmit(formValues) {
		console.dir(formValues);
	}

  render() {
    return (
      <div className="outerWrap">
        <h1 className="header--main">RStart</h1>
        <div className="body">
          <div className="third"></div>
          <div className="third">
            <LinkForm handleFormSubmit={this.handleFormSubmit} />
          </div>
          <div className="third"></div>
        </div>
      </div>
    );
  }
}

export default App;
