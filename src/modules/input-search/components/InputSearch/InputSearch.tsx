import Constants from 'models/Constants';
import { Input } from 'modules/common';
import { Component, ChangeEvent } from 'react';
import cls from './InputSearch.module.scss';

interface InputSearchState {
  value: string;
}

interface InputSearchProps {
  classNames?: string[];
}
export default class InputSearch extends Component<InputSearchProps, InputSearchState> {
  constructor(props: InputSearchProps) {
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

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event;
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
    const { classNames = [] } = this.props;
    const styles = [cls['search-bar'], ...classNames];
    const inputStyles = [cls['input-search']];

    return (
      <Input
        type="text"
        handleChange={this.handleChange}
        value={value}
        id="search-bar"
        placeholder="Search bar..."
        classNames={styles}
        inputStyles={inputStyles}
      />
    );
  }
}
