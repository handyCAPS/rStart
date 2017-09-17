// @flow
import React from 'react';

import './LinkForm.css';

import Form from '../Form/Form';

type Props = {
	categories: Array<any>;
	handleFormSubmit: Function;
};

type State = {};

class LinkForm extends React.Component<Props, State> {

	inputArray: Array<Input>;

	constructor() {
		super();

		this.inputArray = [
			{
				id: 'title',
				value: '',
				attributes: {
					required: true
				},
				errors: []
			},
			{
				id: 'link',
				value: '',
				attributes: {
					required: true
				},
				errors: []
			},
			{
				id: 'category',
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
      <div>
      	<Form
      	inputArray={this.inputArray}
      	handleFormSubmit={this.props.handleFormSubmit} />
      </div>
    	);
  }
}

export default LinkForm;
