/* eslint-disable react/sort-comp */
import Constants from 'models/Constants';
import { ChangeEvent, Component } from 'react';

interface InitialState {
  value: string;
}
export default class Input extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
      value: localStorage.getItem(Constants.SEARCH_KEY) ?? '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    this.setState(() => {
      return {
        value,
      };
    });
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {
    const { value } = this.state as InitialState;
    localStorage.setItem('key', value);
  }

  render() {
    const { value } = this.state as InitialState;

    return (
      <div>
        <label htmlFor="search-bar">
          <input
            type="text"
            onChange={this.handleChange}
            value={value}
            id="search-bar"
            placeholder="enter value here"
          />
        </label>
      </div>
    );
  }
}
