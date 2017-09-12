// @flow
import React from 'react';

import FormInputGroup from '../FormInputGroup/FormInputGroup';

import './LinkForm.css';

type Input = {
	id: string;
	value: string;
	errors: Array;
	attributes?: any;
};

type Props = {
	handleFormSubmit: Function;
	inputArray?: Array<any>;
};

type State = {
	inputs: Array<Input>;
};

class LinkForm extends React.Component<Props, State> {

	handleInputChange: Function;
	handleSubmit: Function;
	getFormValues: Function;
	checkFormForErrors: Function;

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

		this.state = {inputs: this.inputArray};

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
				default:
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
		this.setState({inputs: this.inputArray});
	}

  render() {
    return (
      <div className="Form">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
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
              <button
              	className="Form__button Form__button--submit"
              	type="submit">Submit</button>
          </fieldset>
        </form>
      </div>
    	);
  }
}

export default LinkForm;
