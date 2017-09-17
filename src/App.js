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
	categories: Array<any>;
};

class App extends React.Component<Props, State> {

	columns: Columns;

	handleFormSubmit: Function;
	handleDelete: Function;
	getLinks: Function;
	getCategories: Function;

	constructor() {
		super();

		this.state = (
			{
				links: [],
				categories: []
			}
		);

		this.Columns = {
			link: 'link',
			category: 'category'
		};

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.getLinks = this.getLinks.bind(this);
		this.getCategories = this.getCategories.bind(this);
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

	getCategories() {
		const catsRef = firebase.database().ref(this.Columns.category);
		catsRef.on('value', snapshot => {
			let items = snapshot.val();
			let newState = [];

			for (let item in items) {
				newState.push({
					id: item,
					name: items[item].name
				});
			}

			this.setState({categories: newState});
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
		this.getCategories();
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
            	categories={this.state.categories}
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
