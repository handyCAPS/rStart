// @flow
import React from 'react';

import FormInputGroup from '../FormInputGroup/FormInputGroup';

import './LinkForm.css';

type Input = {
	id: string;
	value: string;
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

	constructor() {
		super();

		this.inputArray = [
			{
				id: 'title',
				value: '',
				attributes: {
					required: true
				}
			},
			{
				id: 'link',
				value: '',
				attributes: {
					required: true
				}
			},
			{
				id: 'category',
				value: '',
				attributes: {
					required: true
				}
			}
		];

		this.state = {inputs: this.inputArray};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.getFormValues = this.getFormValues.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	getFormValues() {
		return this.state.inputs.reduce((p,c) => {
			p[c.id] = c.value;
			return p;
		}, {});
	}

	handleInputChange(index, value) {
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
