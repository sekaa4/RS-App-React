/* eslint-disable class-methods-use-this */
import { Component } from 'react';

interface ButtonProps {
  handleClick?: () => void;
}

export default class Button extends Component<ButtonProps> {
  handleClick?: () => void;

  constructor(props: ButtonProps) {
    super(props);

    const { handleClick } = this.props;
    this.handleClick = handleClick?.bind(this);
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleClick}>
          Click
        </button>
      </div>
    );
  }
}
