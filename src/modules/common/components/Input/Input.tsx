/* eslint-disable react/sort-comp */
import { ChangeEvent, Component } from 'react';

class Input extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: ChangeEvent) {
    const { value } = e.target;
    this.setState((prevState) => {
      return {
        ...prevState,
        value,
      };
    });
  }

  componentDidMount() {
    localStorage.setItem('key', 'didMount');
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    localStorage.setItem('key', 'willUnmount');
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <label htmlFor="search-bar">
          <input type="text" onChange={this.handleChange} value={value} id="search-bar" />
        </label>
        {value}
      </div>
    );
  }
}

export default Input;
