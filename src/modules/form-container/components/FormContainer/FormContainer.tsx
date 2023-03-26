import Data from 'models/Data.type';
import CardList from 'modules/card-list/components/CardList/CardList';
import React, { Component, createRef } from 'react';
import checkValidValue from 'utils/checkValidValue';
import {
  Button,
  Form,
  UncontrolledInput,
  UncontrolledRadioInput,
  UncontrolledSelect,
  UncontrolledTextArea,
} from 'modules/common/index';
import CustomRefObject from 'models/CustomRefObject.type';
import breeds from 'models/breeds';
import Constants from 'models/Constants';
import cls from './FormContainer.module.scss';
import RadioContainer from '../RadioContainer/RadioContainer';

interface FormContainerState {
  dataCard: Data[] | null;
  errorObject: Record<keyof CustomRefObject, false | string>;
}

export default class FormContainer extends Component<Record<string, unknown>, FormContainerState> {
  refObject: CustomRefObject;

  refInputRadioObject: React.RefObject<HTMLInputElement>[];

  refSubmit: React.RefObject<HTMLInputElement | HTMLButtonElement>;

  refForm: React.RefObject<HTMLFormElement>;

  errorObject: Record<keyof CustomRefObject, false | string>;

  isValidate: boolean;

  description: string;

  countOfCards: number;

  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      dataCard: null,
      errorObject: {},
    };

    const { errorObject } = this.state;
    this.refObject = {};
    this.refInputRadioObject = [];
    this.countOfCards = 0;
    this.errorObject = errorObject;
    this.isValidate = true;
    this.description = Constants.DESCRIPTION_FORM;

    this.refForm = createRef<HTMLFormElement>();
    this.refSubmit = createRef<HTMLInputElement>();
    this.createCardFromForm = this.createCardFromForm.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  createCardFromForm(dataObj: Data) {
    this.setState((oldState) => {
      const { dataCard } = oldState;
      if (dataCard) {
        return { dataCard: [...dataCard, dataObj] };
      }
      return { dataCard: [dataObj] };
    });
  }

  submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.validate();
    if (this.isValidate) {
      const dataObj = this.createDataObject();
      this.createCardFromForm(dataObj);
      this.formReset();

      setTimeout(() => alert('Data Save and create card'), 500);
    } else {
      this.setState({ errorObject: this.errorObject });
    }
  }

  createDataObject(): Data {
    this.countOfCards += 1;
    const keys = Object.keys(this.refObject);
    const dataObj = keys.reduce((acc, field) => {
      const { current } = this.refObject[field];
      if (current instanceof HTMLInputElement && current.type === 'file') {
        const fileList = current.files as FileList;
        const fileUrl = window.URL.createObjectURL(fileList[0]);
        return { ...acc, [field]: fileUrl };
      }
      return current ? { ...acc, [field]: current.value } : acc;
    }, {} as Data);

    dataObj.id = this.countOfCards;
    return dataObj;
  }

  validate(): void {
    const validateArr = [this.refObject, this.refInputRadioObject];
    const checkValidObj = checkValidValue(validateArr, this.refObject, this.errorObject);
    this.refObject = checkValidObj.refObject;
    this.errorObject = checkValidObj.errorObject;

    this.isValidate = Object.values(this.errorObject).every((value) => !value);
  }

  formReset() {
    const { current } = this.refForm;
    if (current) current.reset();
  }

  render() {
    const { dataCard } = this.state;

    return (
      <div className={cls['form-container']}>
        <Form
          refForm={this.refForm}
          submitHandler={this.submitHandler}
          description={this.description}
        >
          <div>
            <UncontrolledInput
              type="text"
              id="name"
              text="Enter the name of your cat:"
              refObject={this.refObject}
              placeholder="Name of your cat"
              errorObject={this.errorObject}
            />
            <UncontrolledInput
              type="date"
              id="birthDate"
              refObject={this.refObject}
              errorObject={this.errorObject}
              text="Choose the birthday date of your cat:"
            />
            <UncontrolledInput
              type="number"
              id="age"
              placeholder="Age of your cat"
              refObject={this.refObject}
              errorObject={this.errorObject}
              text="Enter the age of your cat:"
            />
            <RadioContainer errorObject={this.errorObject} name="gender">
              <UncontrolledRadioInput
                id="gender-male"
                defaultValue="male"
                refObject={this.refInputRadioObject}
                errorObject={this.errorObject}
                name="gender"
              />
              <UncontrolledRadioInput
                id="gender-female"
                defaultValue="female"
                refObject={this.refInputRadioObject}
                errorObject={this.errorObject}
                name="gender"
              />
            </RadioContainer>
          </div>
          <div>
            <UncontrolledTextArea
              id="body"
              name="textareaForm"
              refObject={this.refObject}
              errorObject={this.errorObject}
              text="Enter description of your cat:"
              placeholder="Enter description about your cat"
            />
            <UncontrolledSelect
              refObject={this.refObject}
              errorObject={this.errorObject}
              id="breeds"
              name="select-breeds"
              text="Choose breeds of your cat: "
              options={breeds}
            />
            <UncontrolledInput
              type="file"
              id="img"
              text="Choose your cat image:"
              refObject={this.refObject}
              errorObject={this.errorObject}
            />
            <UncontrolledInput
              type="checkbox"
              id="personalData"
              refObject={this.refObject}
              errorObject={this.errorObject}
              text="I consent to my personal data"
            />
            <Button refSubmit={this.refSubmit} text="Create Card" />
          </div>
        </Form>
        {dataCard ? (
          <CardList data={dataCard} />
        ) : (
          <div className={cls['not-found']}>
            Cards not found, please fill the form and create card
          </div>
        )}
      </div>
    );
  }
}
