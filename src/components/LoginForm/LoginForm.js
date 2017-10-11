// @flow

import StartForm from "../StartForm/StartForm";

import { Input } from "../../types/input.type";

import "./LoginForm.css";

type Props = {
  isSignup: boolean,
  formName: string,
  handleLoginSubmit: Function
};

type State = {
  isSignup: boolean,
  inputArray: Array<Input>
};

class LoginForm extends StartForm {
  handleSubmit: Function;

  constructor() {
    super();

    this.state = {
      inputArray: [
        {
          id: "email",
          type: "email",
          value: "",
          attributes: {
            required: true
          },
          errors: []
        },
        {
          id: "password",
          type: "password",
          value: "",
          attributes: {
            required: true
          },
          errors: []
        }
      ]
    };

    this.formName = "Log In";

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps && nextProps.hasOwnProperty("formName")) {
      this.formName = nextProps.formName;
    }
  }
}

export default LoginForm;
