// @flow
import React from 'react';

import './EnterForm.css';

import LoginForm from '../LoginForm/LoginForm';
import Button from '../Button/Button';

import { Colors } from '../../vars/colors';

type Props = {
	handleLoginSubmit: Function;
	handleSignupSubmit: Function;
};

type State = {
	isSignup: boolean;
	buttonLabel: 'Log In' | 'Sign Up';
};

class EnterForm extends React.Component<Props, State> {

	toggleIsSignup: Function;
	handleSubmit: Function;

	constructor() {
		super();

		this.state = {
			isSignup: false,
			buttonLabel: 'Sign Up'
		}

		this.toggleIsSignup = this.toggleIsSignup.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleIsSignup() {
		let newIsSignup = !this.state.isSignup;
		this.setState({
			isSignup: newIsSignup,
			buttonLabel: newIsSignup ? 'Log In' : 'Sign Up'
		});
	}

	handleSubmit(formValues: any) {
		if (this.state.isSignup) {
			this.props.handleSignupSubmit(formValues);
		} else {
			this.props.handleLoginSubmit(formValues);
		}
	}

  render() {
  	const buttonClassNames = ['EnterForm__button EnterForm__button--toggle'];
  	const buttonStyles = {
				border: 'none',
  			color: Colors.lightShade,
  			backgroundColor: Colors.darkShade
  	};
    return (
    	<div className="EnterForm">
    		<Button
    			label={this.state.buttonLabel}
    			classNames={buttonClassNames}
    			styles={buttonStyles}
    			handleClick={this.toggleIsSignup} />
    		<LoginForm
    			isSignup={this.state.isSignup}
    			handleSubmit={this.handleSubmit}
    			formName={this.state.isSignup ? 'Sign Up' : 'Log In'} />
    	</div>
      );
  }
}

export default EnterForm;
