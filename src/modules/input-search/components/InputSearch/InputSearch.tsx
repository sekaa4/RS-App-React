import Constants from 'models/Constants';
import { InputType } from 'models/InputType';
import { Input } from 'modules/common';
import { ChangeEvent, useEffect, useCallback, useState } from 'react';
import cls from './InputSearch.module.scss';

interface InputSearchProps {
  classNames?: string[];
  refSearchValue: React.MutableRefObject<string>;
  handleKeyDown?: () => void;
}

const InputSearch = (props: InputSearchProps) => {
  const { classNames = [], refSearchValue, handleKeyDown } = props;
  const styles = [cls['search-bar'], ...classNames];
  const inputStyles = [cls['input-search']];

  const [searchLine, setSearchLine] = useState<string>(localStorage.getItem('key') ?? '');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setSearchLine(value);
  };

  const onUnload = useCallback(() => {
    localStorage.setItem(Constants.SEARCH_KEY, refSearchValue.current);
  }, [refSearchValue]);

  const handleKeywordKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && handleKeyDown) {
      handleKeyDown();
    }
  };

  useEffect(() => {
    refSearchValue.current = searchLine;
  }, [searchLine, refSearchValue]);

  useEffect(() => {
    window.addEventListener(Constants.BEFOREUNLOAD, onUnload);
    return () => {
      window.removeEventListener(Constants.BEFOREUNLOAD, onUnload);
    };
  }, [onUnload, refSearchValue]);

  return (
    <Input
      id="search-bar"
      type={InputType.TEXT}
      handleChange={handleChange}
      value={searchLine}
      placeholder="Search bar..."
      classNames={styles}
      inputStyles={inputStyles}
      handleKeyDown={handleKeywordKeyPress}
    />
  );
};

export default InputSearch;
