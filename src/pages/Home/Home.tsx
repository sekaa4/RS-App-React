import CardList from 'modules/card-list/components/CardList/CardList';
import InputSearch from 'modules/input-search/components/InputSearch/InputSearch';
import { Button } from 'modules/common';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Data from 'models/Data.type';
import URLConstants from 'models/URLConstants';
import Modal from 'modules/modal/components/Modal/Modal';
import Constants from 'models/Constants';
import cls from './Home.module.scss';
import { ModalState, ContextHome } from './ContextHome';

interface CardListState {
  data: Data[] | null;
}

const Home = () => {
  const [cardListState, setCardListState] = useState<CardListState>({
    data: null,
  });
  const [searchSubmit, setSearchSubmit] = useState<string>(localStorage.getItem('key') ?? '');
  const [isLoading, setLoading] = useState<boolean>(true);
  const [modalData, setModalCard] = useState<ModalState>({
    isModal: false,
    isLoading: false,
    id: null,
  });

  const refSearchValue = useRef<string>(localStorage.getItem('key') ?? '');
  const { isModal } = modalData;

  const handleClick = () => {
    if (searchSubmit === refSearchValue.current) return;
    setSearchSubmit(refSearchValue.current);
    localStorage.setItem(Constants.SEARCH_KEY, refSearchValue.current);
    setLoading(true);
  };

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

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${URLConstants.BASE_URL}?q=${searchSubmit}`);
        const newData = await res.json();
        setCardListState((oldState) => ({ ...oldState, data: newData }));
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [searchSubmit]);

  return (
    <ContextHome.Provider value={initialContextValue}>
      <div className={cls.home}>
        <h2>Home Page</h2>
        <div className={cls['home__search-bar']}>
          <InputSearch refSearchValue={refSearchValue} handleKeyDown={handleClick} />
          <Button text="search" handleClick={handleClick} />
        </div>
        {isLoading ? (
          <div className={cls.loader}>Loading...</div>
        ) : (
          <CardList data={cardListState.data} />
        )}
      </div>
      {isModal && <Modal modalData={modalData} />}
    </ContextHome.Provider>
  );
};

export default Home;
