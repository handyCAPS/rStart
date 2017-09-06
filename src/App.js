// @flow
import React from 'react';

import './App.css';

import LinkForm from './components/LinkForm/LinkForm';
import Link from './components/Link/Link';

import firebase from './firebase';

import { linkItem } from './types/link.item.type';

type Props = {};

type State = {
	links: Array<linkItem>;
};

class App extends React.Component<Props, State> {

	handleFormSubmit: Function;
	getLinks: Function;

	constructor() {
		super();

		this.state = ({links: []});

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.getLinks = this.getLinks.bind(this);
	}

	getLinks() {
		const itemsRef = firebase.database().ref('items');

		itemsRef.on('value', snapshot => {

			let items = snapshot.val();
			let newState = [];

			for (let item in items) {
				newState.push({
					id: item,
					title: items[item].title,
					link: items[item].link,
					category: items[item].category
				});
			}

			this.setState({ links: newState });
		});
	}

	handleFormSubmit(formValues: linkItem) {
		const itemsRef = firebase.database().ref('items');
		itemsRef.push({...formValues});
	}

	componentDidMount() {
		this.getLinks();
	}

  render() {
    return (
      <div className="outerWrap">
        <h1 className="header--main">RStart</h1>
        <div className="body row">
          <div className="col third">
          	{this.state.links.map((link, i) => (
          			<Link {...link} />
          		))}
          </div>
          <div className="col third">
            <LinkForm handleFormSubmit={this.handleFormSubmit} />
          </div>
          <div className="col third"></div>
        </div>
      </div>
    );
  }
}

export default App;
