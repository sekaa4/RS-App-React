import type Data from 'models/Data.type';
import { PureComponent } from 'react';
import cls from './Card.module.scss';

interface CardProps {
  data: Data;
}

export default class Card extends PureComponent<CardProps> {
  render() {
    const {
      data: { body, name, age, birthDate, gender, breeds, img },
    } = this.props;

    return (
      <div className={cls.card}>
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
}
