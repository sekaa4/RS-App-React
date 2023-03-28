import Data from 'models/Data.type';
import CardList from 'modules/card-list/components/CardList/CardList';
import React, { useRef, useState } from 'react';
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
import InputType from 'models/InputType';
import cls from './FormContainer.module.scss';
import RadioContainer from '../RadioContainer/RadioContainer';

interface FormContainerState {
  dataCard: Data[] | null;
  errorObject: Record<keyof CustomRefObject, false | string>;
  countOfCards: number;
  isValidate: boolean;
  refObject: CustomRefObject;
  refInputRadioObject: React.RefObject<HTMLInputElement>[];
}

const FormContainer = () => {
  const [formContainerState, setFormContainerState] = useState<FormContainerState>({
    dataCard: null,
    errorObject: {},
    countOfCards: 0,
    isValidate: true,
    refObject: {},
    refInputRadioObject: [],
  });

  const { errorObject, dataCard, refInputRadioObject, refObject } = formContainerState;

  const description = Constants.DESCRIPTION_FORM;

  const refForm = useRef<HTMLFormElement>(null);
  const refSubmit = useRef<HTMLInputElement>(null);

  const validate = (): void => {
    const validateArr = [refObject, refInputRadioObject];
    const checkValidObj = checkValidValue(validateArr, refObject, errorObject);
    formContainerState.refObject = checkValidObj.refObject;
    formContainerState.errorObject = checkValidObj.errorObject;

    formContainerState.isValidate = Object.values(errorObject).every((value) => !value);
  };

  const createDataObject = (): Data => {
    formContainerState.countOfCards += 1;
    const keys = Object.keys(refObject);
    const dataObj = keys.reduce((acc, field) => {
      const { current } = refObject[field];
      if (current instanceof HTMLInputElement && current.type === 'file') {
        const fileList = current.files as FileList;
        const fileUrl = window.URL.createObjectURL(fileList[0]);
        return { ...acc, [field]: fileUrl };
      }
      return current ? { ...acc, [field]: current.value } : acc;
    }, {} as Data);

    dataObj.id = formContainerState.countOfCards;
    return dataObj;
  };

  const formReset = () => {
    const { current } = refForm;
    if (current) current.reset();
  };

  const createCardFromForm = (dataObj: Data) => {
    setFormContainerState((oldState) => {
      const { dataCard: data } = oldState;
      if (data) {
        return { ...oldState, dataCard: [...data, dataObj] };
      }
      return { ...oldState, dataCard: [dataObj] };
    });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validate();

    if (formContainerState.isValidate) {
      const dataObj = createDataObject();
      createCardFromForm(dataObj);
      formReset();

      setTimeout(() => alert('Data Save and create card'), 500);
    } else {
      setFormContainerState((oldState) => {
        return { ...oldState, errorObject };
      });
    }
  };

  return (
    <div className={cls['form-container']}>
      <Form refForm={refForm} submitHandler={submitHandler} description={description}>
        <div>
          <UncontrolledInput
            type={InputType.TEXT}
            id="name"
            text="Enter the name of your cat:"
            refObject={refObject}
            placeholder="Name of your cat"
            errorObject={errorObject}
          />
          <UncontrolledInput
            type={InputType.DATE}
            id="birthDate"
            refObject={refObject}
            errorObject={errorObject}
            text="Choose the birthday date of your cat:"
          />
          <UncontrolledInput
            type={InputType.NUMBER}
            id="age"
            placeholder="Age of your cat"
            refObject={refObject}
            errorObject={errorObject}
            text="Enter the age of your cat(year):"
          />
          <RadioContainer errorObject={errorObject} name="gender">
            <UncontrolledRadioInput
              id="gender-male"
              defaultValue="male"
              refObject={refInputRadioObject}
              errorObject={errorObject}
              name="gender"
            />
            <UncontrolledRadioInput
              id="gender-female"
              defaultValue="female"
              refObject={refInputRadioObject}
              errorObject={errorObject}
              name="gender"
            />
          </RadioContainer>
        </div>
        <div>
          <UncontrolledTextArea
            id="body"
            name="textareaForm"
            refObject={refObject}
            errorObject={errorObject}
            text="Enter description of your cat:"
            placeholder="Enter description about your cat"
          />
          <UncontrolledSelect
            refObject={refObject}
            errorObject={errorObject}
            id="breeds"
            name="select-breeds"
            text="Choose breeds of your cat: "
            options={breeds}
          />
          <UncontrolledInput
            type={InputType.FILE}
            id="img"
            text="Choose your cat image:"
            refObject={refObject}
            errorObject={errorObject}
          />
          <UncontrolledInput
            type={InputType.CHECKBOX}
            id="personalData"
            refObject={refObject}
            errorObject={errorObject}
            text="I consent to my personal data"
          />
          <Button refSubmit={refSubmit} text="Create Card" />
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
};

export default FormContainer;
