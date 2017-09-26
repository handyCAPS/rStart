// @flow
import React from 'react';

import './App.css';

import LinkForm from './components/LinkForm/LinkForm';
import CatForm from './components/CatForm/CatForm';
import EnterForm from './components/EnterForm/EnterForm';
import Link from './components/Link/Link';

import firebase from './firebase';

import { linkItem, linkStorageItem } from './types/link.item.type';

import { Colors } from './vars/colors';

type Columns = {
	link: string;
	category: string;
};

type CategoryItem = {
	name: string;
};

type CategoryStorageItem = CategoryItem & {
	members: any;
};

type Props = {};

type State = {
	links: Array<linkItem>;
	categories: Array<any>;
};

class App extends React.Component<Props, State> {

	columns: Columns;

	handleFormSubmit: Function;
	handleLoginSubmit: Function;
	handleDelete: Function;
	getLinks: Function;
	getCategories: Function;
	prepareLinkForStorage: Function;

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
		this.handleDelete = this.handleDelete.bind(this);
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
					categories: items[item].categories
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

	prepareLinkForStorage(link: linkItem): linkStorageItem {
		let storageItem = {
			dateAdded: Date.now(),
			clicks: 0,
			excludeFromBestOf: false,
			...link,
			categories: {
				[link.categories]: true
			}
		};
		return storageItem;
	}

	prepareCatForStorage(formValues: CategoryItem): CategoryStorageItem {
		return {
			...formValues,
			members: {}
		};
	}

	handleFormSubmit(type: string, formValues: linkItem | CategoryItem) {

		const itemsRef = firebase.database().ref(type).push();
		let lastInsertID = false;
		let values = formValues;

		if (type === this.Columns.link) {
			values = this.prepareLinkForStorage(formValues);
			lastInsertID = itemsRef.key;
		}

		if (type === this.Columns.category) {
			values = this.prepareCatForStorage(formValues);
		}

		itemsRef.set(values);

		if (lastInsertID !== false) {
			for (let cat in values.categories) {
				firebase.database()
					.ref(this.Columns.category)
					.child(cat + '/members')
					.update({
						[lastInsertID]: true
					});
			}
		}
	}

	handleLoginSubmit(formValues: any) {
		console.dir(formValues);
	}

	handleSignupSubmit(formValues: any) {
		console.dir(formValues);
	}

	handleDelete(type: string, id: string, categories?: any) {
		firebase.database()
			.ref(type)
			.child(id)
			.remove();

		if (type === this.Columns.link) {
			for (let cat in categories) {
				firebase.database()
					.ref(this.Columns.category)
					.child(cat + '/members/' + id)
					.remove();
			}
		}
	}

	componentDidMount() {
		this.getLinks();
		this.getCategories();
	}

  render() {
  	const bodyStyles = {
  		backgroundColor: Colors.lightShade
  	};
    return (
      <div className="outerWrap" style={bodyStyles}>
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
            	handleSubmit={this.handleFormSubmit.bind(null, this.Columns.link)} />
          </div>
          <div className="col third">
          	<CatForm
          		handleSubmit={this.handleFormSubmit.bind(null, this.Columns.category)}/>
          	<EnterForm
          		handleSignupSubmit={this.handleSignupSubmit}
          		handleLoginSubmit={this.handleLoginSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
