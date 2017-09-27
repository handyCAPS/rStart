// @flow
import React from 'react';

import './LogOut.css';

import Button from '../Button/Button';

type Props = {
	handleLogOut: Function;
};

type State = {};

class LogOut extends React.Component<Props, State> {
  render() {
		const buttonClassNames = ['LogOut__button'];
    return (
    	<div className="LogOut">
    		<Button
    			label="Log Out"
    			handleClick={this.props.handleLogOut}
    			classNames={buttonClassNames} />
    	</div>
      );
  }
}

export default LogOut;
