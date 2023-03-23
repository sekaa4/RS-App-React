import Data from 'models/Data.type';
import CardList from 'modules/card-list/components/CardList/CardList';
import React, { Component } from 'react';
import { Form, UncontrolledInput } from 'modules/common/index';
import CustomRefObject from 'models/CustomRefObject.type';
import cls from './FormContainer.module.scss';

interface FormContainerState {
  dataCard: Data[] | null;
}

const data: Data[] = [
  {
    userId: 1,
    id: 1,
    name: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
    birthDate: '2018-03-09',
    age: 5,
    gender: 'male',
    breeds: 'Aegean',
    img: 'https://cdn2.thecatapi.com/images/ehc.jpg',
  },
  {
    userId: 2,
    id: 2,
    name: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
    birthDate: '2018-03-09',
    age: 5,
    gender: 'male',
    breeds: 'Aegean',
    img: 'https://cdn2.thecatapi.com/images/ehc.jpg',
  },
];

export default class FormContainer extends Component<Record<string, unknown>, FormContainerState> {
  formContainer: CustomRefObject;

  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      dataCard: data,
    };
    this.formContainer = {};
    this.createCardFromForm = this.createCardFromForm.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount(): void {}

  createCardFromForm(dataObj: Data) {
    this.setState((oldState) => {
      const { dataCard } = oldState;
      if (dataCard) {
        dataCard.push(dataObj);
        return { dataCard };
      }
      const newArrData = [dataObj];
      return { dataCard: newArrData };
    });
  }

  submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValidate = this.validate();
    if (isValidate) {
      const dataObj = this.createDataObject();
      // this.createCardFromForm(dataObj);
      this.formReset();

      alert('Data Save and create card');
    }
  }

  createDataObject(): Data {
    const keys = Object.keys(this.formContainer);
    const dataObj = keys.reduce((acc, field) => {
      const { current } = this.formContainer[field];
      if (field === 'form' || !current) return acc;
      return { ...acc, [field]: current.value };
    }, {} as Data);

    return dataObj;
  }

  validate(): boolean {
    const isValidate = Object.keys(this.formContainer).every((field) => {
      if (field === 'form' || field === 'submit') return true;
      const { current } = this.formContainer[field];
      if (current && current.value === '') {
        return false;
      }
      return true;
    });

    return isValidate;
  }

  formReset() {
    const { form } = this.formContainer;
    if (form.current && form.current instanceof HTMLFormElement) form.current.reset();
  }

  render() {
    const { dataCard } = this.state;

    return (
      <div className={cls['form-container']}>
        <Form refer={this.formContainer} submitHandler={this.submitHandler}>
          <UncontrolledInput
            type="text"
            id="name"
            refer={this.formContainer}
            placeholder="Enter the name of your cat"
          />
          {/* <UncontrolledInput
            type="textarea"
            id="description"
            refer={this.formContainer}
            defaultValue="Enter description about your cat"
          /> */}
          <UncontrolledInput
            type="date"
            id="date"
            refer={this.formContainer}
            text="Choose the birthday date of your cat"
          />
          <UncontrolledInput
            type="number"
            id="age"
            refer={this.formContainer}
            text="Enter the age of your cat"
          />
          {/* <UncontrolledInput
            type="checkbox"
            refer={this.formContainer}
            id="breeds"
            text="Choose breeds of your cat"
          /> */}
          {/* <UncontrolledInput
            type="checkbox"
            id="personal-data"
            refer={this.formContainer}
            text="I consent to my personal data"
          /> */}
          {/* <UncontrolledInput
            type="radio"
            id="gender-male"
            refer={this.formContainer}
            name="gender"
            defaultValue="male"
            text="Male"
          />
          <UncontrolledInput
            type="radio"
            id="gender-female"
            refer={this.formContainer}
            name="gender"
            defaultValue="female"
            text="Female"
          /> */}
          {/* <UncontrolledInput type="file" id="image" refer={this.formContainer} /> */}
          <UncontrolledInput
            type="submit"
            id="submit"
            refer={this.formContainer}
            inputStyles={[cls['submit-button']]}
            defaultValue="Submit"
          />
        </Form>
        {dataCard ? <CardList data={dataCard} /> : <CardList />}
      </div>
    );
  }
}
