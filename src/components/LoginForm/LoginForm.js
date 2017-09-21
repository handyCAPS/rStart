// @flow
import React from 'react';

import Form from '../Form/Form';

import { Input } from '../../types/input.type';

import './LoginForm.css';

type Props = {
	handleSubmit: Function;
};

type State = {};

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
	}

  render() {
    return (
    	<Form handleSubmit={this.props.handleSubmit} inputArray={this.inputArray} />
      );
  }
}

export default LoginForm;
