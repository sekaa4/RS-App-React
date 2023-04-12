import CardList from 'modules/card-list/components/CardList/CardList';
import InputSearch from 'modules/input-search/components/InputSearch/InputSearch';
import { Button } from 'modules/common';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import URLConstants from 'models/URLConstants';
import Modal from 'modules/modal/components/Modal/Modal';
import { useAppDispatch, useAppSelector } from 'redux/redux';
import { mainDataSlice } from 'store/reducers/MainDataSlice';
import { searchStringSlice } from 'store/reducers/SearchStringSlice';
import cls from './Home.module.scss';
import { ModalState, ContextHome } from './ContextHome';

const Home = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [modalData, setModalCard] = useState<ModalState>({
    isModal: false,
    isLoading: false,
    id: null,
  });

  const refSearchValue = useRef<string>('');
  const { isModal } = modalData;

  const dispatch = useAppDispatch();
  const { mainData } = useAppSelector((state) => state.mainDataReducer);
  const { value } = useAppSelector((state) => state.searchLineReducer);

  const handleClick = () => {
    if (value === refSearchValue.current) return;
    dispatch(searchStringSlice.actions.writeSearchLine(refSearchValue.current));
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
        const res = await fetch(`${URLConstants.BASE_URL}?q=${value}`);
        const newData = await res.json();
        dispatch(mainDataSlice.actions.writeMainData(newData));
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [dispatch, value]);

  return (
    <ContextHome.Provider value={initialContextValue}>
      <div className={cls.home}>
        <h2>Home Page</h2>
        <div className={cls['home__search-bar']}>
          <InputSearch refSearchValue={refSearchValue} handleKeyDown={handleClick} />
          <Button text="search" handleClick={handleClick} />
        </div>
        {isLoading ? <div className={cls.loader}>Loading...</div> : <CardList data={mainData} />}
      </div>
      {isModal && <Modal modalData={modalData} />}
    </ContextHome.Provider>
  );
};

export default Home;
