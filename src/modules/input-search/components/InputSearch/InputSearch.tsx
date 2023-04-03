import Constants from 'models/Constants';
import { InputType } from 'models/InputType';
import { Input } from 'modules/common';
import { ChangeEvent, useEffect, useCallback, useState } from 'react';
import cls from './InputSearch.module.scss';

interface InputSearchProps {
  classNames?: string[];
  refSearchValue: React.MutableRefObject<string>;
}

const InputSearch = (props: InputSearchProps) => {
  const { classNames = [], refSearchValue } = props;
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

  useEffect(() => {
    refSearchValue.current = searchLine;
  }, [searchLine, refSearchValue]);

  useEffect(() => {
    window.addEventListener(Constants.BEFOREUNLOAD, onUnload);
    return () => {
      localStorage.setItem(Constants.SEARCH_KEY, refSearchValue.current);
      window.removeEventListener(Constants.BEFOREUNLOAD, onUnload);
    };
  }, [onUnload, refSearchValue]);

  return (
    <Input
      type={InputType.TEXT}
      handleChange={handleChange}
      value={searchLine}
      id="search-bar"
      placeholder="Search bar..."
      classNames={styles}
      inputStyles={inputStyles}
    />
  );
};

export default InputSearch;
