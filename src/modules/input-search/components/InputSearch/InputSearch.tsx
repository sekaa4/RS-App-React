import Constants from 'models/Constants';
import InputType from 'models/InputType';
import { Input } from 'modules/common';
import { ChangeEvent, useState, useEffect, useCallback, useRef } from 'react';
import cls from './InputSearch.module.scss';

interface InputSearchState {
  value: string;
}

interface InputSearchProps {
  classNames?: string[];
}

const InputSearch = (props: InputSearchProps) => {
  const { classNames = [] } = props;
  const styles = [cls['search-bar'], ...classNames];
  const inputStyles = [cls['input-search']];
  const initialState = {
    value: localStorage.getItem(Constants.SEARCH_KEY) ?? '',
  };

  const [inputValue, setInputValue] = useState<InputSearchState>(initialState);
  const refValue = useRef<string>(inputValue.value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setInputValue((oldState) => {
      return { ...oldState, value };
    });
  };

  const onUnload = useCallback(() => {
    localStorage.setItem(Constants.SEARCH_KEY, refValue.current);
  }, []);

  useEffect(() => {
    refValue.current = inputValue.value;
  }, [inputValue]);

  useEffect(() => {
    window.addEventListener(Constants.BEFOREUNLOAD, onUnload);
    return () => {
      localStorage.setItem(Constants.SEARCH_KEY, refValue.current);
      window.removeEventListener(Constants.BEFOREUNLOAD, onUnload);
    };
  }, [onUnload]);

  return (
    <Input
      type={InputType.TEXT}
      handleChange={handleChange}
      value={inputValue.value}
      id="search-bar"
      placeholder="Search bar..."
      classNames={styles}
      inputStyles={inputStyles}
    />
  );
};

export default InputSearch;
