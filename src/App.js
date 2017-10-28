// @flow
import React from 'react';

import './App.css';

import LinkForm from './components/LinkForm/LinkForm';
import CatForm from './components/CatForm/CatForm';
import EnterForm from './components/EnterForm/EnterForm';
import Link from './components/Link/Link';
import Button from './components/Button/Button';
import ImageForm from './components/ImageForm/ImageForm';
import Links from './components/Links/Links';
import NavBar from './components/NavBar/NavBar';

import firebase from './firebase';

import { linkItem, linkStorageItem } from './types/link.item.type';

import { Colors } from './vars/colors';

type Columns = {
  link: string,
  category: string
};

type CategoryItem = {
  name: string
};

type CategoryStorageItem = CategoryItem & {
  members: any
};

type Props = {};

type State = {
  links: Array<linkItem>,
  categories: Array<any>,
  user: any,
  showForms: boolean,
  page: 'forms' | 'links'
};

class App extends React.Component<Props, State> {
  Columns: Columns;
  userLoaded: boolean;

  handleFormSubmit: Function;
  handleLoginSubmit: Function;
  handleDelete: Function;
  getLinks: Function;
  getCategories: Function;
  prepareLinkForStorage: Function;
  handleImageUpload: Function;
  handleAuthChange: Function;
  handleLogOut: Function;
  handleImageFormSubmit: Function;
  handleNav: Function;

  constructor() {
    super();

    this.state = {
      links: [],
      categories: [],
      user: false,
      showForms: false,
      page: 'links'
    };

    this.Columns = {
      link: 'link',
      category: 'category'
    };
  }

  getLinks = () => {
    const itemsRef = firebase
      .database()
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
  };

  getCategories = () => {
    const catsRef = firebase
      .database()
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

      this.setState({ categories: newState });
    });
  };

  prepareLinkForStorage = (link: linkItem): linkStorageItem => {
    const protocolRegEx = /^https?:\/\//g;
    const linkUrl = protocolRegEx.test(link.link)
      ? link.link
      : 'http://' + link.link;
    let storageItem = {
      dateAdded: Date.now(),
      clicks: 0,
      excludeFromBestOf: false,
      ...link,
      link: linkUrl,
      categories: {
        [link.categories]: true
      }
    };
    return storageItem;
  };

  prepareCatForStorage = (formValues: CategoryItem): CategoryStorageItem => {
    return {
      ...formValues,
      members: {}
    };
  };

  handleLinkFormSubmit = (formValues: linkItem): void => {
    const refString = [this.state.user.uid, this.Columns.link].join('/');
    const itemsRef = firebase
      .database()
      .ref(refString)
      .push();
    let lastInsertID = false;
    let values = this.prepareLinkForStorage(formValues);
    lastInsertID = itemsRef.key;
    if (values.image !== false) {
      this.handleImageUpload(values.image, lastInsertID);
      values = { ...values, image: false };
    }

    itemsRef.set(values);

    if (lastInsertID !== false) {
      for (let cat in values.categories) {
        firebase
          .database()
          .ref(this.state.user.uid)
          .child(this.Columns.category + '/' + cat + '/members')
          .update({
            [lastInsertID]: true
          });
      }
    }
  };

  handleCatFormSubmit = (formValues: CategoryItem): void => {
    const refString = [this.state.user.uid, this.Columns.category].join('/');
    const itemsRef = firebase
      .database()
      .ref(refString)
      .push(formValues);
  };

  handleFormSubmit = (
    type: string,
    formValues: linkItem | CategoryItem
  ): void => {
    const refString = [this.state.user.uid, type].join('/');
    const itemsRef = firebase
      .database()
      .ref(refString)
      .push();
    let lastInsertID = false;
    let values = { ...formValues };

    if (type === this.Columns.link) {
      values = this.prepareLinkForStorage(formValues);
      lastInsertID = itemsRef.key;
      if (values.image !== false) {
        this.handleImageUpload(values.image, lastInsertID);
        values = { ...values, image: false };
      }
    }

    if (type === this.Columns.category) {
      values = this.prepareCatForStorage(formValues);
    }

    itemsRef.set(values);

    if (lastInsertID !== false) {
      for (let cat in values.categories) {
        firebase
          .database()
          .ref(this.state.user.uid)
          .child(this.Columns.category + '/' + cat + '/members')
          .update({
            [lastInsertID]: true
          });
      }
    }
  };

  handleImageUpload = (files: Array<any>, linkId: string): void => {
    console.log('id:', linkId);
    console.dir(files);
  };

  handleImageFormSubmit = (formValues: any): void => {
    console.dir(formValues);
  };

  handleLoginSubmit = (formValues: any): void => {
    const { email, password } = formValues;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.dir(error);
      });
  };

  handleSignupSubmit = (formValues: any): void => {
    const { email, password } = formValues;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        console.dir(error);
      });
  };

  handleDelete = (type: string, id: string, categories?: any): void => {
    firebase
      .database()
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
          id
        ].join('/');

        firebase
          .database()
          .ref(refString)
          .remove();
      }
    }
  };

  handleAuthChange = (): void => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
      if (user) {
        this.getLinks();
        this.getCategories();
      }
    });
  };

  handleLogOut = (): void => {
    firebase
      .auth()
      .signOut()
      .then()
      .catch();
  };

  handleNav = (page: 'links' | 'forms') => {
    this.setState({ page });
  };

  componentDidMount = () => {
    this.handleAuthChange();
    this.userLoaded = true;
  };

  componentWillMount = () => {
    this.userLoaded = false;
  };

  render = () => {
    const bodyStyles = {
      backgroundColor: Colors.lightShade
    };

    return (
      <div className="outerWrap" style={bodyStyles}>
        {this.state.user !== null && (
          <NavBar handleNav={this.handleNav} handleLogOut={this.handleLogOut} />
        )}
        <div className="body row">
          {this.state.user === null &&
            this.userLoaded && (
              <div className="container container--form container--form--enter">
                <EnterForm
                  handleSignupSubmit={this.handleSignupSubmit}
                  handleLoginSubmit={this.handleLoginSubmit}
                />
              </div>
            )}
          {this.state.user !== null && [
            [
              this.state.page === 'forms' && [
                <div className="container container--form container--form--link">
                  {this.state.categories.length > 0 && (
                    <LinkForm
                      categories={this.state.categories}
                      handleSubmit={this.handleFormSubmit.bind(
                        null,
                        this.Columns.link
                      )}>
                      <Button label="Image" />
                    </LinkForm>
                  )}
                </div>,
                <div className="container container--form container--form--category">
                  <CatForm
                    handleSubmit={this.handleFormSubmit.bind(
                      null,
                      this.Columns.category
                    )}
                  />
                </div>,
                <div className="container container--form container--form--image">
                  <ImageForm handleSubmit={this.handleImageFormSubmit} />
                </div>
              ]
            ],
            [
              this.state.page === 'links' && (
                <div className="container container--links">
                  <Links
                    links={this.state.links}
                    handleDelete={this.handleDelete.bind(
                      null,
                      this.Columns.link
                    )}
                  />
                </div>
              )
            ]
          ]}
        </div>
      </div>
    );
  };
}

export default App;
