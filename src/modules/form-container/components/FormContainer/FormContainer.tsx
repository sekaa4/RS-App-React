import Data from 'models/Data.type';
import CardList from 'modules/card-list/components/CardList/CardList';
import { InputType } from 'models/InputType';
import { useRef, useState } from 'react';
import {
  Button,
  Form,
  UncontrolledInput,
  UncontrolledRadioInput,
  UncontrolledSelect,
  UncontrolledTextArea,
} from 'modules/common/index';
import breeds from 'models/breeds';
import Constants from 'models/Constants';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormInput from 'models/FormInput';
import FormPropName from 'models/FormPropName';
import cls from './FormContainer.module.scss';
import RadioContainer from '../RadioContainer/RadioContainer';

interface FormContainerState {
  dataCard: Data[] | null;
}

const FormContainer = () => {
  const refForm = useRef<HTMLFormElement>(null);
  const refSubmit = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, submitCount, isValid, isSubmitSuccessful },
    reset,
  } = useForm<FormInput>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const [formContainerState, setFormContainerState] = useState<FormContainerState>({
    dataCard: null,
  });
  const { dataCard } = formContainerState;

  const getObjWithCorrectField = (
    acc: Data,
    field: keyof FormInput,
    value: FormInput[keyof FormInput]
  ): Data => {
    switch (field) {
      case FormPropName.NAME_FIELD:
        return { ...acc, name: value.toString() };
      case FormPropName.TEXTAREA_FIELD:
        return { ...acc, body: value.toString() };
      case FormPropName.BIRTH_DATE_FIELD:
        return { ...acc, birthDate: value.toString() };
      case FormPropName.AGE_FIELD:
        return { ...acc, age: Number(value) };
      case FormPropName.GENDER_FIELD:
        if (value === 'male' || value === 'female') return { ...acc, gender: value };
        break;
      case FormPropName.SELECT_BREEDS_FIELD:
        return { ...acc, breeds: value.toString() };
      case FormPropName.IMG_FIELD: {
        if (value instanceof FileList) {
          const fileUrl = window.URL.createObjectURL(value[0]);
          return { ...acc, img: fileUrl };
        }
        break;
      }
      default:
        return acc;
    }
    return acc;
  };

  const createDataObject = (data: FormInput, count: number): Data => {
    const keys = Object.keys(data) as (keyof typeof data)[];
    const dataObj = keys.reduce((acc, field) => {
      const current = data[field];
      return getObjWithCorrectField(acc, field, current);
    }, {} as Data);

    dataObj.id = count;
    return dataObj;
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

  const submitHandler: SubmitHandler<FormInput> = (data: FormInput) => {
    if (isValid) {
      const dataObj = createDataObject(data, submitCount);
      createCardFromForm(dataObj);
      reset();
    }
  };
  return (
    <div className={cls['form-container']}>
      <Form
        refForm={refForm}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        description={Constants.DESCRIPTION_FORM}
      >
        <div>
          <UncontrolledInput
            type={InputType.TEXT}
            propName={FormPropName.NAME_FIELD}
            id="name"
            text="Enter the name of your cat:"
            placeholder="Name of your cat"
            register={register}
            errors={errors}
          />
          <UncontrolledInput
            type={InputType.DATE}
            propName={FormPropName.BIRTH_DATE_FIELD}
            id="birthDate"
            text="Choose the birthday date of your cat:"
            register={register}
            errors={errors}
          />
          <UncontrolledInput
            type={InputType.NUMBER}
            id="age"
            propName={FormPropName.AGE_FIELD}
            placeholder="Age of your cat"
            text="Enter the age of your cat(year):"
            min="0"
            register={register}
            errors={errors}
          />
          <RadioContainer errors={errors} name="genderField">
            <UncontrolledRadioInput
              id="gender-male"
              defaultValue="male"
              propName={FormPropName.GENDER_FIELD}
              register={register}
            />
            <UncontrolledRadioInput
              id="gender-female"
              defaultValue="female"
              propName={FormPropName.GENDER_FIELD}
              register={register}
            />
          </RadioContainer>
        </div>
        <div>
          <UncontrolledTextArea
            id="body"
            propName={FormPropName.TEXTAREA_FIELD}
            text="Enter description of your cat:"
            placeholder="Enter description about your cat"
            register={register}
            errors={errors}
          />
          <UncontrolledSelect
            id="breeds"
            propName={FormPropName.SELECT_BREEDS_FIELD}
            text="Choose breeds of your cat: "
            options={breeds}
            register={register}
            errors={errors}
          />
          <UncontrolledInput
            type={InputType.FILE}
            id="img"
            propName={FormPropName.IMG_FIELD}
            text="Choose your cat image:"
            register={register}
            errors={errors}
          />
          <UncontrolledInput
            type={InputType.CHECKBOX}
            id="personalData"
            propName={FormPropName.PERSONAL_DATA_FIELD}
            text="I consent to my personal data"
            register={register}
            errors={errors}
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
