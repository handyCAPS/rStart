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
		files?: any;
		styles?: any;
		labelClasses?: Array<string>;
		inputClasses?: Array<string>;
		handleChange: Function;
		errors: Array;
};

type State = {};

class FormInputGroup extends React.Component<Props, State> {

	handleChange: Function;
	handleCheckboxChange: Function;
	getStyles: Function;

	constructor() {
		super();

		this.handleChange = this.handleChange.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.getStyles = this.getStyles.bind(this);
	}

	getClassList(type: string) {
		const inputType = this.props.type ? this.props.type : 'text';
		const labelClasses = this.props.labelClasses ? this.props.labelClasses : [];
		const inputClasses = this.props.inputClasses ? this.props.inputClasses : [];
		const classLists = {
			label: ['Form__label', 'Form__label--' + inputType, ...labelClasses],
			input: ['Form__input', 'Form__input--' + inputType, ...inputClasses]
		};

		return classLists[type].join(' ');
	}

	handleChange(event) {
		let value = event.target.value;
		if (this.props.type === 'file') {
			value = event.target.files ? event.target.files : [];
		}
		this.props.handleChange(this.props.index, value);
	}

	handleCheckboxChange(checked) {
		this.props.handleChange(this.props.index, checked);
	}

	getStyles(type: string) {
		if (this.props.styles) {
			if (this.props.styles.hasOwnProperty(type)) {
				return this.props.styles[type];
			}
			if (this.props.styles.hasOwnProperty('all') && type !== 'label') {
				return this.props.styles['all'];
			}
		}
		return {};
	}

	render() {
		const inputType = this.props.type !== undefined ? this.props.type : "text";
		return (
				<p className="FormInputGroup">
					<label
							htmlFor={this.props.id}
							style={this.getStyles('label')}
							className={this.getClassList('label')}>{this.props.label !== undefined ? this.props.label : this.props.id}
					</label>
					{ this.props.type === 'checkbox' &&
					<Checkbox
						id={this.props.id}
						style={this.getStyles('checkbox')}
						handleChange={this.handleCheckboxChange}
						classList={['Form__input', 'Form__input--checkbox']} /> }
					{ this.props.type === 'select' &&
					<Select
						id={this.props.id}
						styles={this.getStyles('select')}
						classList={({
							select: ['Form__input', 'Form__input--select', ...this.getClassList('input')],
							options: ['Form__option']

						})}
						handleChange={this.handleChange}
						options={this.props.children} /> }
					{ this.props.type === 'textarea' &&
						<textarea
							id={this.props.id}
							style={this.getStyles('textarea')}
							onChange={this.handleChange}
							className={this.getClassList('input')}
							value={this.props.value}
							{...this.props.attributes} ></textarea>
					}
					{ ['select', 'checkbox', 'textarea'].indexOf(this.props.type) === -1 &&
					<input
							type={inputType}
							style={this.getStyles(inputType)}
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
