// @flow

import StartForm from '../StartForm/StartForm';

import { Input } from '../../types/input.type';

import './LoginForm.css';

type Props = {
	isSignup: boolean;
	formName: string;
};

type State = {
	isSignup: boolean;
	inputArray: Array<Input>;
};

class LoginForm extends StartForm<Props, State> {

	constructor() {
		super();

		this.state = {
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
		this.props.handleSubmit(formValues);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps && nextProps.hasOwnProperty('formName')) {
			this.formName = nextProps.formName;
		}
	}
}

export default LoginForm;
