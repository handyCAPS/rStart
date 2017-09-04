// @flow
import React, { Component } from 'react';

import FormInputGroup from '../FormInputGroup/FormInputGroup';

import './Form.css';

type Props = {};

type State = {};

class Form extends React.Component<Props, State> {

  render() {
    return (
      <div className="Form">
        <form {...this.props}>
          <fieldset>
              <FormInputGroup id="title" label="title" />
          </fieldset>
        </form>
      </div>
    	);
  }
}

export default Form;
