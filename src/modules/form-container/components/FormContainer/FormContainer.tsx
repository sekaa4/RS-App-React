import { SubmitHandler, useForm } from 'react-hook-form';
import { useRef } from 'react';
import createDataObject from 'utils/createDataObject';
import Data from 'models/Data.type';
import { InputType } from 'models/InputType';
import breeds from 'models/breeds';
import FormInput from 'models/FormInput';
import FormPropName from 'models/FormPropName';
import Constants from 'models/Constants';
import CardList from 'modules/card-list/components/CardList/CardList';
import {
  Button,
  Form,
  UncontrolledInput,
  UncontrolledRadioInput,
  UncontrolledSelect,
  UncontrolledTextArea,
} from 'modules/common/index';
import { useAppDispatch, useAppSelector } from 'redux/redux';
import { formDataSlice } from 'store/reducers/FormDataSlice';
import RadioContainer from '../RadioContainer/RadioContainer';
import cls from './FormContainer.module.scss';

const FormContainer = () => {
  const refForm = useRef<HTMLFormElement>(null);
  const refSubmit = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { dataForm } = useAppSelector((state) => state.formDataReducer);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
    reset,
  } = useForm<FormInput>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const updateStateCardFromForm = (dataObj: Data) => {
    dispatch(formDataSlice.actions.writeFormData(dataObj));
  };

  const submitHandler: SubmitHandler<FormInput> = (data: FormInput) => {
    if (isValid) {
      const dataObj = createDataObject(data);
      updateStateCardFromForm(dataObj);
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
      {dataForm.length !== 0 ? (
        <CardList data={dataForm} form />
      ) : (
        <div className={cls['not-found']}>
          Cards not found, please fill the form and create card
        </div>
      )}
      {isSubmitSuccessful ? (
        <div className={[cls.modal].join(' ')}>Data Save and create card</div>
      ) : (
        ''
      )}
    </div>
  );
};

export default FormContainer;
