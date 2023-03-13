/* eslint-disable class-methods-use-this */
import { Component } from 'react';

class Button extends Component {
  onClickHandler() {}

  render() {
    return (
      <div>
        <button type="button" onClick={this.onClickHandler}>
          Click
        </button>
      </div>
    );
  }
}

export default Button;
