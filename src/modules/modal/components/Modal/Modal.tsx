import { ModalState, useContextHome } from 'pages/Home/ContextHome';
import cardDataAPI from 'services/CardDataService';
import Portal from 'utils/Portal';

import cls from './Modal.module.scss';

interface ModalData {
  modalData: ModalState;
}

const Modal = (props: ModalData) => {
  const {
    modalData: { id },
  } = props;
  const { isFetching, data } = cardDataAPI.useFetchModalCardDataQuery(id);
  const { handleClickCloseCardModal } = useContextHome();
  const modalCard = data && data.length >= 1 ? data[0] : null;

  return (
    <Portal>
      <div
        className={isFetching ? [cls.modal, cls.opened].join(' ') : cls.modal}
        onClick={handleClickCloseCardModal}
      >
        <div className={cls.overlay}>
          <div
            className={cls['modal-window']}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <button
              type="button"
              className={cls['close-modal']}
              onClick={handleClickCloseCardModal}
            >
              ✖
            </button>
            {modalCard && !isFetching && (
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
            {isFetching ? <div className={cls.loader}>Loading...</div> : false}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
