// @flow
import React from 'react';

import './App.css';

import LinkForm from './components/LinkForm/LinkForm';
import CatForm from './components/CatForm/CatForm';
import EnterForm from './components/EnterForm/EnterForm';
import Link from './components/Link/Link';
import LogOut from './components/LogOut/LogOut';

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
	user: any;
};

class App extends React.Component<Props, State> {

	columns: Columns;
	userLoaded: boolean;

	handleFormSubmit: Function;
	handleLoginSubmit: Function;
	handleDelete: Function;
	getLinks: Function;
	getCategories: Function;
	prepareLinkForStorage: Function;
	handleImageUpload: Function;
	handleLogOut: Function;

	constructor() {
		super();

		this.state = {
				links: [],
				categories: [],
				user: false
			};

		this.Columns = {
			link: 'link',
			category: 'category'
		};

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleImageUpload = this.handleImageUpload.bind(this);
		this.getLinks = this.getLinks.bind(this);
		this.getCategories = this.getCategories.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAuthChange = this.handleAuthChange.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
	}

	getLinks() {
		const itemsRef = firebase.database()
			.ref(this.state.user.uid)
			.child(this.Columns.link);

		itemsRef.on('value', snapshot => {

			let items = snapshot.val();
			let newState = [];

			for (let item in items) {
				newState.push({
					id: item,
					title: items[item].title,
					link: items[item].link,
					description: items[item].description,
					categories: Object.keys(items[item].categories)
				});
			}

			this.setState({ links: newState });
		});
	}

	getCategories() {

		const catsRef = firebase.database()
			.ref(this.state.user.uid)
			.child(this.Columns.category);

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
		const refString = [this.state.user.uid, type].join('/');
		const itemsRef = firebase.database().ref(refString).push();
		let lastInsertID = false;
		let values = formValues;

		if (type === this.Columns.link) {
			values = this.prepareLinkForStorage(formValues);
			lastInsertID = itemsRef.key;
			if (values.image !== false) {
				this.handleImageUpload(values.image, lastInsertID);
				values = {...values, image: false};
			}
		}

		if (type === this.Columns.category) {
			values = this.prepareCatForStorage(formValues);
		}

		itemsRef.set(values);

		if (lastInsertID !== false) {
			for (let cat in values.categories) {
				firebase.database()
					.ref(this.state.user.uid)
					.child(this.Columns.category + '/' + cat + '/members')
					.update({
						[lastInsertID]: true
					});
			}
		}
	}

	handleImageUpload(files: Array, linkId: string) {
		console.log("id:", linkId);
		console.dir(files);
	}

	handleLoginSubmit(formValues: any) {
		const { email, password } = formValues;
		firebase.auth()
			.signInWithEmailAndPassword(email, password)
			.catch(error => {
				console.dir(error);
			});
	}

	handleSignupSubmit(formValues: any) {
		const { email, password } = formValues;
		firebase.auth()
			.createUserWithEmailAndPassword(email, password)
			.catch(error => {
				console.dir(error);
			});
	}

	handleDelete(type: string, id: string, categories?: any) {
		firebase.database()
			.ref(this.state.user.uid)
			.child(type)
			.child(id)
			.remove();

		if (type === this.Columns.link) {
			for (let cat in categories) {

				const refString = [
					this.state.user.uid,
					this.Columns.category,
					cat,
					'members',
					id].join('/');

				firebase.database()
					.ref(refString)
					.remove();
			}
		}
	}

	handleAuthChange() {
		firebase.auth()
			.onAuthStateChanged(user => {
				this.setState({user});
				if (user) {
					this.getLinks();
					this.getCategories();
				}
			});
	}

	handleLogOut() {
		firebase.auth().signOut()
			.then()
			.catch();
	}

	componentDidMount() {
		this.handleAuthChange();
				this.userLoaded = true;
	}

	componentWillMount() {
	    this.userLoaded = false;
	}

  render() {
  	const bodyStyles = {
  		backgroundColor: Colors.lightShade
  	};
  	const linkStyles = {
  		anchor: {
  			color: Colors.lightShade
  		},
  		header: {
  			color: Colors.lightShade
  		},
  		body: {
  			backgroundColor: Colors.darkAccent
  		}
  	};
    return (
      <div className="outerWrap" style={bodyStyles}>
        <div className="body row">
        	{this.state.user !== null &&
      			<LogOut handleLogOut={this.handleLogOut} />
        	}
          <div className="col third">
          	{this.state.user !== null && this.state.links.map((link, i) => (
          			<Link
          				key={i}
          				styles={linkStyles}
          				{...link}
            			handleDelete={this.handleDelete.bind(null, this.Columns.link)} />
          		))}
          </div>
          <div className="col third">
            {this.state.user !== null && this.state.categories.length > 0 &&
            	<LinkForm
            	categories={this.state.categories}
            	handleSubmit={this.handleFormSubmit.bind(null, this.Columns.link)} />
            }
          </div>
          <div className="col third">
          	{this.state.user !== null &&
	          	<CatForm
	          		handleSubmit={this.handleFormSubmit.bind(null, this.Columns.category)}/>
        		}
          	{this.state.user === null && this.userLoaded &&
          		<EnterForm
	          		handleSignupSubmit={this.handleSignupSubmit}
	          		handleLoginSubmit={this.handleLoginSubmit} />
          	}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
