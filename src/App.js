// @flow
import React from 'react';

import './App.css';

import LinkForm from './components/LinkForm/LinkForm';
import CatForm from './components/CatForm/CatForm';
import Link from './components/Link/Link';

import firebase from './firebase';

import { linkItem } from './types/link.item.type';

type Columns = {
	link: string;
	category: string;
};

type Props = {};

type State = {
	links: Array<linkItem>;
};

class App extends React.Component<Props, State> {

	columns: Columns;

	handleFormSubmit: Function;
	handleDelete: Function;
	getLinks: Function;

	constructor() {
		super();

		this.state = ({links: []});

		this.Columns = {
			link: 'link',
			category: 'category'
		};

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.getLinks = this.getLinks.bind(this);
	}

	getLinks() {
		const itemsRef = firebase.database().ref(this.Columns.link);

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

	handleFormSubmit(type: string, formValues: linkItem) {
		const itemsRef = firebase.database().ref(type);
		itemsRef.push({...formValues});
	}

	handleDelete(type: string, id: string) {
		firebase.database()
			.ref(type)
			.child(id)
			.remove();
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
          			<Link
          				key={i}
          				{...link}
            			handleDelete={this.handleDelete.bind(null, this.Columns.link)} />
          		))}
          </div>
          <div className="col third">
            <LinkForm
            	handleFormSubmit={this.handleFormSubmit.bind(null, this.Columns.link)} />
          </div>
          <div className="col third">
          	<CatForm
          		handleFormSubmit={this.handleFormSubmit.bind(null, this.Columns.category)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
