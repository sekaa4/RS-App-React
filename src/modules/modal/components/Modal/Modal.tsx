/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/aria-role */
import Data from 'models/Data.type';
import URLConstants from 'models/URLConstants';
import { ModalState, useContextHome } from 'pages/Home/ContextHome';
import { useEffect, useState } from 'react';

import cls from './Modal.module.scss';

interface ModalData {
  modalData: ModalState;
}

const Modal = (props: ModalData) => {
  const [modalCard, setModalCard] = useState<Data | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const {
    modalData: { id },
  } = props;
  const { handleClickCloseCardModal } = useContextHome();

  useEffect(() => {
    const abortController = new AbortController();
    const getData = async (idData: number) => {
      try {
        const res = await fetch(`${URLConstants.BASE_URL}?id=${idData}`, {
          signal: abortController.signal,
        });
        const newData = await res.json();
        setModalCard({ ...newData[0] });
      } catch (err) {
        if (err instanceof Error) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      } finally {
        setLoading(false);
      }
    };
    if (id && isLoading) getData(id);
    return () => {
      // if (isLoading) abortController.abort();
    };
  }, [id, isLoading]);

  return (
    <div className={cls.modal} onClick={handleClickCloseCardModal}>
      <div
        className={cls['modal-window']}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button type="button" className={cls['close-modal']} onClick={handleClickCloseCardModal}>
          ✖
        </button>
        {modalCard && !isLoading && (
          <div>
            <img src={modalCard.img} alt="cat" className={cls.image} />
            <div className={cls.description}>
              <span>
                <b>name:</b> {modalCard.name}
              </span>
              <span>
                <b>description:</b> {modalCard.body}
              </span>
              <span>
                <b>age:</b> {modalCard.age}
              </span>
              <span>
                <b>birth date:</b> {modalCard.birthDate}
              </span>
              <span>
                <b>gender:</b> {modalCard.gender}
              </span>
              <span>
                <b>breeds:</b> {modalCard.breeds}
              </span>
            </div>
          </div>
        )}
        {isLoading ? <div className={cls.loader}>Loading...</div> : false}
      </div>
    </div>
  );
};

export default Modal;
