import { createContext, useContext } from 'react';

export interface ModalState {
  isModal: boolean;
  isLoading: boolean;
  id: number | null;
}

interface InitialContext {
  handleClickCardModal: (id: number) => void;
  handleClickCloseCardModal: () => void;
  modalData: ModalState;
}

export const ContextHome = createContext<InitialContext>({
  handleClickCardModal: () => {},
  handleClickCloseCardModal: () => {},
  modalData: { isModal: false, isLoading: false, id: null },
});

export const useContextHome = () => useContext(ContextHome);
