// @flow

import StartForm from '../StartForm/StartForm';

import type { Input } from '../../types/input.type';

import './LoginForm.css';

type Props = {
  isSignup: boolean,
  formName: string
};

type State = {
  inputArray: Array<Input>
};

class LoginForm extends StartForm {
  state: State;
  constructor() {
    super();

    this.state = {
      inputArray: [
        {
          id: 'email',
          type: 'email',
          value: '',
          attributes: {
            required: true
          },
          errors: []
        },
        {
          id: 'password',
          type: 'password',
          value: '',
          attributes: {
            required: true
          },
          errors: []
        }
      ]
    };

    this.formName = 'Log In';
  }

  componentWillReceiveProps(nextProps: any) {
    if (
      nextProps &&
      Object.prototype.hasOwnProperty.call(nextProps, 'formName')
    ) {
      this.formName = nextProps.formName;
    }
  }
}

export default LoginForm;
