// @flow
import React from 'react';

import './FormInputGroup.css';

type Props = {
		id: string;
		label: string;
		key: number;
		index: number;
		value?: string;
		attributes?: any;
		labelClasses?: Array<string>;
		inputClasses?: Array<string>;
		handleChange: Function;
};

type State = {};

class FormInputGroup extends React.Component<Props, State> {

	handleChange: Function;

	parseAttributes: Function;

	handleAttributes: Function;

	hasAttributes: boolean;

	inputAttributes: any;

	constructor() {
		super();

		this.handleChange = this.handleChange.bind(this);
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

	handleChange(event) {
		this.props.handleChange(this.props.index, event.target.value);
	}

	getAttributes() {
		let attributeObject = {};
		if (typeof this.props.attributes !== 'undefined') {
			for (let att in this.props.attributes) {
				attributeObject[att] = this.props.attributes[att];
			}
		}
		return this.parseAttributes(attributeObject);
	}

	parseAttributes(attributeObject: any) {
		let attributeString = '';
		for (let att in attributeObject) {
			attributeString += att + "=" + "'" + attributeObject[att] + "'";
		}
		return attributeString;
	}

	render() {
		const inputAttributes = this.getAttributes();
		return (
				<p className="FormInputGroup">
					<label
							htmlFor={this.props.id}
							className={this.getClassList('label')}>{this.props.label}
					</label>
					<input
							type="text"
							id={this.props.id}
							value={this.props.value}
							onChange={this.handleChange}
							{...this.props.attributes}
							className={this.getClassList('input')}/>
				</p>
				);
	}
}

export default FormInputGroup;
