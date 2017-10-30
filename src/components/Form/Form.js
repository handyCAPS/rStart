// @flow
import React from 'react';

import FormInputGroup from '../FormInputGroup/FormInputGroup';

import './Form.css';

import Button from '../Button/Button.js';

import type { Input } from '../../types/input.type';

type FormStyles = {
  form?: any,
  fieldset?: any,
  submitButton?: any
};

type Props = {
  handleFormSubmit: Function,
  inputArray: Array<Input>,
  styles?: FormStyles,
  classNames: Array<string>,
  children: any
};

type State = {
  inputs: Array<Input>
};

class Form extends React.Component<Props, State> {
  handleSubmit: Function;
  getFormValues: Function;
  checkFormForErrors: Function;
  getStyles: Function;
  getClassNames: Function;
  handleChange: Function;

  addedClasses: Array<string>;

  constructor(props: Props) {
    super(props);

    this.state = { inputs: props.inputArray };

    this.addedClasses = [];

    this.handleChange = this.handleChange.bind(this);
    this.getFormValues = this.getFormValues.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkFormForErrors = this.checkFormForErrors.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.getClassNames = this.getClassNames.bind(this);
  }

  getFormValues() {
    return this.state.inputs.reduce((p, c) => {
      p[c.id] = c.value;
      return p;
    }, {});
  }

  checkFormForErrors(): boolean {
    let noErrors = true;
    const checkedInputs = this.state.inputs.reduce((prev, cur) => {
      if (!cur.attributes) {
        return prev;
      }
      switch (true) {
        case cur.attributes.required:
          if (cur.value === '') {
            cur.errors.push('This field is required');
            noErrors = false;
          }
        // eslint-disable-next-line no-fallthrough
        default:
          break;
      }
      prev.push(cur);
      return prev;
    }, []);
    this.setState({ inputs: checkedInputs });
    return noErrors;
  }

  handleChange(index: number, value: string | Array<any>) {
    this.setState({
      inputs: this.state.inputs.map((input: Input, i: number) => {
        if (i === index) {
          return {
            ...input,
            value
          };
        }
        return input;
      })
    });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    if (!this.checkFormForErrors()) {
      return;
    }
    this.props.handleFormSubmit(this.getFormValues());
    this.setState({ inputs: this.props.inputArray });
  }

  getStyles(type: string) {
    if (!this.props.styles) {
      return {};
    }
    return this.props.styles[type] ? this.props.styles[type] : {};
  }

  getClassNames(): string {
    const classList = ['Form'];
    if (!this.props.classNames) {
      return classList.join(' ');
    }
    return [...classList, ...this.addedClasses, ...this.props.classNames].join(
      ' '
    );
  }

  render() {
    const submitButtonProps = {
      label: 'Submit',
      type: 'submit',
      classNames: ['Form__button', 'Form__button--submit'],
      styles: this.getStyles('submitButton')
    };
    return (
      <div className={this.getClassNames()} style={this.getStyles('form')}>
        <form onSubmit={this.handleSubmit}>
          <fieldset
            className="Form__fieldset"
            style={this.getStyles('fieldset')}>
            {this.state.inputs.map((input, i) => (
              <FormInputGroup
                key={i}
                index={i}
                styles={this.getStyles('inputs')}
                handleChange={this.handleChange}
                {...input}
              />
            ))}
            {this.props.children !== false && (
              <p className="FormInputGroup Form__children">
                {this.props.children}
              </p>
            )}
            <p className="Form__buttons">
              <Button {...submitButtonProps} />
            </p>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Form;
