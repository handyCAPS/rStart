// @flow
import React from 'react';

import './Checkbox.css';

type Props = {
	id: string;
	classList?: Array<string>;
	checked?: boolean;
};

type State = {
	isChecked: boolean;
};

class Checkbox extends React.Component<Props, State> {

	handleChange: Function;

	constructor(props) {
		super(props);
		this.state = {isChecked: !!props.checked};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange() {
		const newState = !this.state.isChecked;
		this.setState({ isChecked: newState });
		this.props.handleChange(newState);
	}

  render() {
  	const classList = this.props.classList ? this.props.classList : [];
    return (
    	<input
    		type="checkbox"
    		className={['Checkbox', ...classList]}
    		id={this.props.id}
    		checked={this.state.isChecked}
    		onChange={this.handleChange}
    		name={this.props.id}/>
      );
  }
}

export default Checkbox;
