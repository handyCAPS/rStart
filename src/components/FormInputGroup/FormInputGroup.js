// @flow
import React from 'react';

import Select from '../Select/Select';
import Checkbox from '../Checkbox/Checkbox';

import './FormInputGroup.css';


type Props = {
		id: string;
		label: string;
		key: number;
		index: number;
		type?: string;
		children?: Array<any>;
		value?: string;
		attributes?: any;
		labelClasses?: Array<string>;
		inputClasses?: Array<string>;
		handleChange: Function;
		errors: Array;
};

type State = {};

class FormInputGroup extends React.Component<Props, State> {

	// shouldBeType: Function;

	handleChange: Function;
	handleCheckboxChange: Function;

	constructor() {
		super();

		this.handleChange = this.handleChange.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	}

	getClassList(type: string) {
		const labelClasses = this.props.labelClasses ? this.props.labelClasses : [];
		const inputClasses = this.props.inputClasses ? this.props.inputClasses : [];
		const classLists = {
			label: ['Form__label', ...labelClasses],
			input: ['Form__input', ...inputClasses]
		};

		return classLists[type].join(' ');
	}

	// shouldBeType(type: string): boolean {
	// 	const allTypes = [
	// 		'text',
	// 		'select',
	// 		'checkbox'
	// 	];

	// }

	handleChange(event) {
		console.log("value:", event.target.value);
		this.props.handleChange(this.props.index, event.target.value);
	}

	handleCheckboxChange(checked) {
		console.log("checked:", checked);
		this.props.handleChange(this.props.index, checked);
	}

	render() {
		return (
				<p className="FormInputGroup">
					<label
							htmlFor={this.props.id}
							className={this.getClassList('label')}>{this.props.label !== undefined ? this.props.label : this.props.id}
					</label>
					{ this.props.type === 'checkbox' &&
					<Checkbox
						id={this.props.id}
						handleChange={this.handleCheckboxChange}
						classList={['Form__input', 'Form__input--checkbox']} /> }
					{ this.props.type === 'select' && this.props.type !== 'checkbox' &&
					<Select
						id={this.props.id}
						classList={({
							select: ['Form__input', 'Form__input--select'],
							options: ['Form__option']
						})}
						handleChange={this.handleChange}
						options={this.props.children} /> }
					{ ['select', 'checkbox'].indexOf(this.props.type) === -1 &&
					<input
							type={this.props.type !== undefined ? this.props.type : "text"}
							id={this.props.id}
							value={this.props.value}
							onChange={this.handleChange}
							{...this.props.attributes}
							className={this.getClassList('input')}/> }
							<span className="Form__input__errors">{this.props.errors.join(' ')}</span>
				</p>
				);
	}
}

export default FormInputGroup;
