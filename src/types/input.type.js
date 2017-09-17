export type Input = {
	id: string;
	label?: string;
	type?: string;
	children?: Array<any>;
	value: string;
	errors: Array;
	attributes?: any;
};

export type InputOption = {
	value: string;
	label?: string;
};

export type InputSelect = {
	id: string;
	label?: string;
	value?: string;
	options: Array<InputOption>;
};
