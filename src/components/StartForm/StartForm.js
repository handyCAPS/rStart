// @flow
import React from 'react';

import './StartForm.css';

import Form from '../Form/Form';

import { Input } from '../../types/input.type';
import { Colors } from '../../vars/colors';

type Props = {
	handleSubmit: Function;
};

type State = {
	inputArray: Array<Input>;
};

class StartForm extends React.Component<Props, State> {

	wrapperClass: string;
	formName: string;

	handleSubmit: Function;

	constructor() {
		super();

		this.state = {inputArray: {}};;

		this.wrapperClass = '';
		this.formName = 'Start Form';

		this.handleSubmit = this.handleSubmit.bind(this);
		this.getFormStyles = this.getFormStyles.bind(this);
		this.addStyles = this.addStyles.bind(this);
	}

	handleSubmit(formValues: any) {
		this.props.handleSubmit(formValues);
	}

	getFormStyles() {
		return {
			submitButton: {
				color: Colors.darkShade,
				borderColor: Colors.darkShade
			},
			...this.addStyles()
		};
	}

	addStyles() {
		return {};
	}

  render() {
    return (
    	<div className="StartForm">
    		<h3 className="StartForm__header">{this.formName}</h3>
    		<Form
    			styles={this.getFormStyles()}
    			handleFormSubmit={this.handleSubmit}
    			inputArray={this.state.inputArray} />
    	</div>
      );
  }
}

export default StartForm;
