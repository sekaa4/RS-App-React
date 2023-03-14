import Constants from 'models/Constants';
import { ChangeEvent, Component } from 'react';

interface InputState {
  value: string;
}
export default class Input extends Component<Record<string, never>, InputState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      value: localStorage.getItem(Constants.SEARCH_KEY) ?? '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onUnload = this.onUnload.bind(this);
  }

  componentDidMount() {
    window.addEventListener(Constants.BEFOREUNLOAD, this.onUnload);
  }

  componentWillUnmount() {
    const { value } = this.state;
    localStorage.setItem(Constants.SEARCH_KEY, value);

    window.removeEventListener(Constants.BEFOREUNLOAD, this.onUnload);
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    this.setState(() => {
      return {
        value,
      };
    });
  }

  onUnload() {
    const { value } = this.state;
    localStorage.setItem(Constants.SEARCH_KEY, value);
  }

  render() {
    const { value } = this.state;

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
