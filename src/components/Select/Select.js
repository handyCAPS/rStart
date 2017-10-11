// @flow
import React from 'react';

import './Select.css';

import { InputSelect } from '../../types/input.type';

type Option = {
  value: string,
  label?: string
};

type SelectClassList = {
  select?: Array<string>,
  options?: Array<string>
};

type Props = InputSelect & {
  handleChange: Function,
  classList?: SelectClassList
};

type State = {};

class Select extends React.Component<Props, State> {
  getClassList: Function;

  getClassList(propClassList: any): any {
    const classList = {
      select: ['Select'],
      options: ['Select__option']
    };
    if (!propClassList) {
      return classList;
    }
    if (Array.isArray(propClassList.select)) {
      classList.select = [...classList.select, ...propClassList.select];
    }
    if (Array.isArray(propClassList.options)) {
      classList.options = [...classList.options, ...propClassList.options];
    }

    return classList;
  }

  getStyles(type: string) {
    if (!this.props.styles) {
      return {};
    }
    return this.props.styles[type] ? this.props.styles[type] : {};
  }

  render() {
    const classList = this.getClassList(this.props.classList);
    return (
      <select
        name={this.props.id}
        style={this.getStyles('select')}
        id={this.props.id}
        onChange={this.props.handleChange}
        className={classList.select.join(' ')}>
        {this.props.options.map((option: Option, index: number) => (
          <option
            key={index}
            style={this.getStyles('options')}
            className={classList.options.join(' ')}
            value={option.value}>
            {option.label !== undefined ? option.label : option.value}
          </option>
        ))}
      </select>
    );
  }
}

export default Select;
