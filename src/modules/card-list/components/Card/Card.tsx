import type Data from 'models/Data.type';
import { useContextHome } from 'pages/Home/ContextHome';
import cls from './Card.module.scss';

interface CardProps {
  data: Data;
  form?: boolean;
}

const Card = (props: CardProps) => {
  const {
    data: { body, name, age, birthDate, gender, breeds, img, id },
    form,
  } = props;
  const { handleClickCardModal } = useContextHome();
  if (form) {
    return (
      <div className={cls.card} onClick={() => handleClickCardModal(id)}>
        <img src={img} alt="cat" className={cls.image} />
        <div className={cls.description}>
          <span>
            <b>name:</b> {name}
          </span>
          <span>
            <b>description:</b> {body}
          </span>
          <span>
            <b>age:</b> {age}
          </span>
          <span>
            <b>birth date:</b> {birthDate}
          </span>
          <span>
            <b>gender:</b> {gender}
          </span>
          <span>
            <b>breeds:</b> {breeds}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className={cls.card} onClick={() => handleClickCardModal(id)}>
      <img src={img} alt="cat" className={cls.image} />
      <div className={cls.description}>
        <span>
          <b>name:</b> {name}
        </span>
        <span>
          <b>description:</b> {body}
        </span>
      </div>
    </div>
  );
};

export default Card;
