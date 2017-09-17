// @flow
import React from 'react';

import './Select.css';

import { InputSelect } from '../../types/input.type';

type SelectClassNames = {
	select: Array<string>;
	options: Array<string>;
};

type Props = InputSelect & {
	classNames?: SelectClassNames;
};

type State = {};

class Select extends React.Component<Props, State> {
  render() {
  	const hasClassNames = !!this.props.classNames;
  	const propNamesSelect = hasClassNames ? (this.props.classNames.select || []) : [];
  	const selectClassNames = ['Form__input', 'Form__input--select', [...propNamesSelect]];
  	const propNamesOptions = hasClassNames ? (this.props.classNames.options || []) : [];
  	const optionsClassNames = ['Form__input', 'Form__input--options', [...propNamesOptions]];
    return (
    	<select
    		name={this.props.id}
    		id={this.props.id}
    		className={selectClassNames.join(' ')}>
    		{this.props.options.map((option, index) => (
    			<option
    				key={index}
    				className={optionsClassNames.join(' ')}
    				value={option.value}>{option.label || option.value}</option>
    			))}
  		</select>
      );
  }
}

export default Select;
