// @flow
import React from 'react';

import Form from '../Form/Form';

import { Input } from '../../types/input.type';

import './LoginForm.css';

type Props = {
	handleLoginSubmit: Function;
	handleSignupSubmit: Function;
};

type State = {
	isSignup: boolean;
};

class LoginForm extends React.Component<Props, State> {

	inputArray: Array<Input>;

	constructor() {
		super();
		this.inputArray = [
			{
				id: 'name',
				value: '',
				attributes: {
					required: true
				},
				errors: []
			},
			{
				id: 'password',
				type: 'password',
				value: '',
				attributes: {
					required: true
				},
				errors: []
			}
		];

		this.state = {isSignup: false};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(formValues: any) {
		if (this.state.isSingup) {
			this.props.handleSignupSubmit(formValues);
		} else {
			this.props.handleLoginSubmit(formValues);
		}
	}

	toggleSignup = () => {
		this.setState({isSignup: !this.state.isSignup});
	}

  render() {
  	const header = this.state.isSignup ? 'Sign Up' : 'Log In';
    return (
    	<div className="LoginForm">
    		<h3 className="LoginForm__header">{ header }</h3>
    		<button type="button" className="LoginForm__signup-toggle" onClick={this.toggleSignup}>Sign Up</button>
    		<Form handleSubmit={this.handleSubmit} inputArray={this.inputArray} />
    	</div>
      );
  }
}

export default LoginForm;
