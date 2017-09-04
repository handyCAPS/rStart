// @flow
import React from 'react';

import FormInputGroup from '../FormInputGroup/FormInputGroup';

import './Form.css';

type Input = {
	id: string;
	value: string;
};

type Props = {};

type State = {
	inputs: Array<Input>;
};

class Form extends React.Component<Props, State> {

	constructor() {
		super();

		const inputArray = [
			{
				id: 'title',
				value: ''
			}
		];
		this.state = {inputs: inputArray};
		this.handleInputChange = this.handleInputChange.bind(this);
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

  render() {
    return (
      <div className="Form">
        <form {...this.props}>
          <fieldset>
              { this.state.inputs.map((inp, i) => (
              		<FormInputGroup
              			key={i}
              			index={i}
              			id={inp.id}
              			label={inp.id}
              			handleChange={this.handleInputChange}
              			value={inp.value} />
              	)) }
          </fieldset>
        </form>
      </div>
    	);
  }
}

export default Form;
