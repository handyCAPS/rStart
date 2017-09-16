// @flow
import React from 'react';

import Form from '../Form/Form';

import './CatForm.css';

import { Input } from '../../types/input.type';

type Props = {
	handleFormSubmit: Function;
};

type State = {};

class CatForm extends React.Component<Props, State> {

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
			}
		];
	}

  render() {
    return (
    	<Form
    		handleSubmit={this.props.handleFormSubmit}
    		inputArray={this.inputArray} />
      );
  }
}

export default CatForm;
