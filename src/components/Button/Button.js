// @flow
import React from 'react';

import './Button.css';

type Props = {
  label: string,
  handleClick?: Function,
  type?: string,
  classNames?: Array<string>,
  styles?: any
};

const Button = ({
  label,
  handleClick,
  type = 'button',
  classNames = [],
  styles = {}
}: Props) => (
  <button
    onClick={handleClick}
    className={['Button ', ...classNames].join(' ')}
    style={styles}
    type={type}>
    {label}
  </button>
);

export default Button;
