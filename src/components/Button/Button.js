// @flow
import React from 'react';

import './Button.css';


const Button = ({
	label,
	type,
	classNames,
	styles
	}) => (
		<button
			className={['Button ', ...classNames].join(' ')}
			style={styles ? styles : {}}
			type={type ? type : 'button'}>
			{label}
			</button>
	);

export default Button;
