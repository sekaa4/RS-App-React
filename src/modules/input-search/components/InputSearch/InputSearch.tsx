import { InputType } from 'models/InputType';
import { Input } from 'modules/common';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppSelector } from 'redux/redux';
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

  const { value } = useAppSelector((state) => state.searchLineReducer);
  const [searchLine, setSearchLine] = useState<string>(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: valueString },
    } = event;

    setSearchLine(valueString);
  };

  const handleKeywordKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && handleKeyDown) {
      handleKeyDown();
    }
  };

  useEffect(() => {
    refSearchValue.current = searchLine;
  }, [searchLine, refSearchValue]);

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
