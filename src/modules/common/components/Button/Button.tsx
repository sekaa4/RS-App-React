import React, { Component } from 'react';
import cls from './Button.module.scss';

interface ButtonProps {
  handleClick?: () => void;
  refSubmit?: React.RefObject<HTMLInputElement | HTMLButtonElement>;
}

export default class Button extends Component<ButtonProps> {
  handleClick?: () => void;

  refSubmit?: React.RefObject<HTMLButtonElement>;

  constructor(props: ButtonProps) {
    super(props);

    const { handleClick, refSubmit } = this.props;

    if (refSubmit) {
      this.refSubmit = refSubmit as React.RefObject<HTMLButtonElement>;
    } else {
      this.handleClick = handleClick?.bind(this);
    }
  }

  render() {
    if (this.refSubmit) {
      return (
        <button type="submit" className={cls.button} ref={this.refSubmit}>
          Submit
        </button>
      );
    }
    return (
      <button type="button" onClick={this.handleClick} className={cls.button}>
        search
      </button>
    );
  }
}
