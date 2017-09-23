// @flow
import StartForm from '../StartForm/StartForm';

import './CatForm.css';

import { Input } from '../../types/input.type';

type Props = {
	handleSubmit: Function;
};

type State = {
	inputArray: Array<Input>;
};

class CatForm extends StartForm<Props, State> {

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
				}
		]};

		this.formName = 'Add Category';
	}

}

export default CatForm;
