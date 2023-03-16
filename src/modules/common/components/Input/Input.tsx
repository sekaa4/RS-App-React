import Constants from 'models/Constants';
import { ChangeEvent, Component } from 'react';
import cls from './Input.module.scss';

interface InputState {
  value: string;
}

interface InputProps {
  classNames?: string[];
}
export default class Input extends Component<InputProps, InputState> {
  constructor(props: InputProps) {
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
    const { classNames = '' } = this.props;

    return (
      <label htmlFor="search-bar" className={[...classNames].join(' ')}>
        <input
          type="text"
          onChange={this.handleChange}
          value={value}
          id="search-bar"
          placeholder="Search bar..."
          className={cls['input-search']}
        />
      </label>
    );
  }
}
