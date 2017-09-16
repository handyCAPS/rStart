// @flow
import React from 'react';

import FormInputGroup from '../FormInputGroup/FormInputGroup';

import './LinkForm.css';

import Form from '../Form/Form';

import Colors from '../../vars/colors';

import Button from '../Button/Button.js';

type Props = {
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
  	const submitButtonProps = {
  		label: 'Submit',
  		type: 'submit',
  		classNames: ['Form__button', 'Form__button--submit'],
  		styles: {
  			color: Colors.main,
  			border: '2px solid ' + Colors.main,
  			borderRadius: '5px'
  		}
  	};
    return (
      <Form
      	inputArray={this.inputArray}
      	handleSubmit={this.props.handleFormSubmit} />
    	);
  }
}

export default LinkForm;
