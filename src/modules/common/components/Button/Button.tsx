import { Component } from 'react';
import cls from './Button.module.scss';

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
      <button type="button" onClick={this.handleClick} className={cls.button}>
        search
      </button>
    );
  }
}
