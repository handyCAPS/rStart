// @flow
// @flow
import React from 'react';

import FormInputGroup from '../FormInputGroup/FormInputGroup';

import './Form.css';


import Colors from '../../vars/colors';

import Button from '../Button/Button.js';

import { Input } from '../../types/input.type';


type Props = {
	handleFormSubmit: Function;
	inputArray: Array<Input>;
};

type State = {
	inputs: Array<Input>;
};

class Form extends React.Component<Props, State> {

	handleInputChange: Function;
	handleSubmit: Function;
	getFormValues: Function;
	checkFormForErrors: Function;

	constructor(props) {
		super(props);

		this.state = {inputs: props.inputArray};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.getFormValues = this.getFormValues.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.checkFormForErrors = this.checkFormForErrors.bind(this);
	}

	getFormValues() {
		return this.state.inputs.reduce((p,c) => {
			p[c.id] = c.value;
			return p;
		}, {});
	}

	checkFormForErrors(): boolean {
		let noErrors = true;
		const checkedInputs = this.state.inputs.reduce((prev, cur) => {
			switch (true) {
				case cur.attributes.required:
					if (cur.value === '') {
						cur.errors.push('This field is required');
						noErrors = false;
					}
				default: // eslint-disable-line no-fallthrough
					break;
			}
			prev.push(cur);
			return prev;
		}, []);
		this.setState({inputs: checkedInputs});
		return noErrors;
	}

	handleInputChange(index: number, value: string) {
		this.setState({
			inputs: this.state.inputs.map((input, i) => {
				if (i === index) {
					return {
						...input,
						value
					};
				}
				return input;
			})
		});
	}

	handleSubmit(event: Event) {
		event.preventDefault();
		if (!this.checkFormForErrors()) { return; }
		this.props.handleFormSubmit(this.getFormValues());
		this.setState({inputs: this.props.inputArray});
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
      <div className="Form">
        <form onSubmit={this.handleSubmit}>
          <fieldset className="Form__fieldset">
              { this.state.inputs.map((input, i) => (
              		<FormInputGroup
              			key={i}
              			index={i}
              			id={input.id}
              			label={input.id}
              			errors={input.errors}
              			handleChange={this.handleInputChange}
              			value={input.value} />
              	)) }
            	<p className="Form__buttons"><Button {...submitButtonProps} /></p>
          </fieldset>
        </form>
      </div>
    	);
  }
}

export default Form;
