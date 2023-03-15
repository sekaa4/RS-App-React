import type Data from 'models/Data.type';
import { Component, PureComponent } from 'react';

interface CardProps {
  data: Data;
}

export default class Card extends PureComponent<CardProps> {
  render() {
    const {
      data: { body, id, img, title, userId },
    } = this.props;
    // const imgURL = `${import.meta.env.BASE_URL}assets/images/${img}`;
    return (
      <div>
        <img src={img} alt="cat" />
        <div>{title}</div>
        <div>{body}</div>
      </div>
    );
  }
}
