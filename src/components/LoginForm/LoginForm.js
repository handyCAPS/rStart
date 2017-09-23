// @flow

import StartForm from '../StartForm/StartForm';

import { Input } from '../../types/input.type';

import './LoginForm.css';

type Props = {
	handleLoginSubmit: Function;
	handleSignupSubmit: Function;
};

type State = {
	isSignup: boolean;
	inputArray: Array<Input>;
};

class LoginForm extends StartForm<Props, State> {

	constructor() {
		super();

		this.state = {
			isSignup: false,
			inputArray: [
				{
					id: 'name',
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

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(formValues: any) {
		if (this.state.isSingup) {
			this.props.handleSignupSubmit(formValues);
		} else {
			this.props.handleLoginSubmit(formValues);
		}
	}

	toggleSignup = () => {
		const newIsSignup = !this.state.isSignup;
		this.setState({isSignup: newIsSignup});
		this.formName = newIsSignup ? 'Sign Up' : 'Log In';
	}
}

export default LoginForm;
