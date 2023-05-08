import CardList from 'modules/card-list/components/CardList/CardList';
import InputSearch from 'modules/input-search/components/InputSearch/InputSearch';
import { Button } from 'modules/common';
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import Modal from 'modules/modal/components/Modal/Modal';
import { useAppDispatch, useAppSelector } from 'redux/redux';
import { searchStringSlice } from 'store/reducers/SearchStringSlice';
import cardDataAPI from 'services/CardDataService';
import cls from './Home.module.scss';
import { ModalState, ContextHome } from './ContextHome';

const Home = () => {
  const [modalData, setModalCard] = useState<ModalState>({
    isModal: false,
    isLoading: false,
    id: null,
  });
  const { value } = useAppSelector((state) => state.searchLineReducer);
  const [str, setStr] = useState(value);

  const { isFetching, data, error } = cardDataAPI.useFetchAllCardDataQuery(str);

  useEffect(() => {
    setStr(value);
  }, [value]);

  const refSearchValue = useRef<string>('');
  const { isModal } = modalData;

  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    if (value === refSearchValue.current) return;
    dispatch(searchStringSlice.actions.writeSearchLine(refSearchValue.current));
  }, [dispatch, value]);

  const handleClickCardModal = useCallback((id: number) => {
    const newModalState = {
      isModal: true,
      isLoading: true,
      id,
    };
    setModalCard(newModalState);
  }, []);

  const handleClickCloseCardModal = useCallback(() => {
    const newModalState = {
      isModal: false,
      isLoading: false,
      id: null,
    };
    setModalCard(newModalState);
  }, []);

  const initialContextValue = useMemo(
    () => ({
      handleClickCardModal,
      handleClickCloseCardModal,
      modalData,
    }),
    [handleClickCardModal, handleClickCloseCardModal, modalData]
  );

  return (
    <ContextHome.Provider value={initialContextValue}>
      <div className={cls.home}>
        <h2>Home Page</h2>
        <div className={cls['home__search-bar']}>
          <InputSearch refSearchValue={refSearchValue} handleKeyDown={handleClick} />
          <Button text="search" handleClick={handleClick} />
        </div>
        {isFetching && <div className={cls.loader}>Loading...</div>}
        {(error && <div>{}</div>) || (!isFetching && data && <CardList data={data} />)}
      </div>
      {isModal && <Modal modalData={modalData} />}
    </ContextHome.Provider>
  );
};

export default Home;
