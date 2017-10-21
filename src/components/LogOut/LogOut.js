// @flow
import React from 'react';

import './LogOut.css';

import Button from '../Button/Button';

import { Colors } from '../../vars/colors';

type Props = {
  handleLogOut: Function
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
          classNames={buttonClassNames}
          styles={{ backgroundColor: Colors.lightShade }}
        />
      </div>
    );
  }
}

export default LogOut;
