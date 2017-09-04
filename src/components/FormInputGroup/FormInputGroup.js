// @flow
import React, { Component } from 'react';

import './FormInputGroup.css';

type Props = {
    id: string;
    label: string;
    value?: string;
    labelClasses?: Array<string>;
    inputClasses?: Array<string>;
};

type State = {};

class FormInputGroup extends React.Component<Props, State> {
	getClassList(type: string) {
		const labelClasses = this.props.labelClasses ? this.props.labelClasses : [];
		const inputClasses = this.props.inputClasses ? this.props.inputClasses : [];
		const classLists = {
			label: ['Form__label', ...labelClasses],
			input: ['Form__input', ...inputClasses]
		};

		return classLists[type].join(' ');
	}
  render() {
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
              className={this.getClassList('input')}/>
        </p>
        );
  }
}

export default FormInputGroup;
