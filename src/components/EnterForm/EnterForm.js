// @flow
import React from 'react';

import './EnterForm.css';

import LoginForm from '../LoginForm/LoginForm';
import Button from '../Button/Button';

import { Colors } from '../../vars/colors';

type Props = {
  handleLoginSubmit: Function,
  handleSignupSubmit: Function
};

type State = {
  isSignup: boolean,
  buttonLabel: 'Log In' | 'Sign Up',
  leaving: boolean
};

class EnterForm extends React.Component<Props, State> {
  toggleIsSignup: Function;
  handleLoginFormSubmit: Function;

  constructor() {
    super();

    this.state = {
      isSignup: false,
      buttonLabel: 'Sign Up',
      leaving: false
    };

    this.toggleIsSignup = this.toggleIsSignup.bind(this);
    this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this);
  }

  toggleIsSignup() {
    let newIsSignup = !this.state.isSignup;
    this.setState({
      isSignup: newIsSignup,
      buttonLabel: newIsSignup ? 'Log In' : 'Sign Up'
    });
  }

  handleLoginFormSubmit(formValues: any) {
    if (this.state.isSignup) {
      this.props.handleSignupSubmit(formValues);
    } else {
      this.props.handleLoginSubmit(formValues);
    }
    this.setState({ leaving: true });
  }

  animationEnded() {
    console.log('====================================');
    console.log('Animation ended');
    console.dir(arguments);
    console.log('====================================');
  }

  render() {
    const buttonClassNames = ['EnterForm__button EnterForm__button--toggle'];
    const buttonStyles = {
      border: 'none',
      color: Colors.lightShade,
      backgroundColor: Colors.darkShade
    };
    return (
      <div
        className={[
          'EnterForm',
          this.state.leaving ? 'spinningAndLeaving' : ''
        ].join(' ')}
        onTransitionEnd={this.animationEnded()}>
        <Button
          label={this.state.buttonLabel}
          classNames={buttonClassNames}
          styles={buttonStyles}
          handleClick={this.toggleIsSignup}
        />
        <LoginForm
          handleSubmit={this.handleLoginFormSubmit}
          formName={this.state.isSignup ? 'Sign Up' : 'Log In'}
        />
      </div>
    );
  }
}

export default EnterForm;
