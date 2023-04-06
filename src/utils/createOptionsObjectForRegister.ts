import FormInput from 'models/FormInput';
import { InputType, InputTypeOption } from 'models/InputType';
import { Validate } from 'react-hook-form';

const createOptionsObjectForRegister = (
  type: InputTypeOption
):
  | Validate<string | FileList | boolean, FormInput>
  | Record<string, Validate<string | FileList | boolean, FormInput>> => {
  switch (type) {
    case InputType.TEXT:
      return {
        notEmpty: (value) =>
          (typeof value === 'string' && value.trim().length > 0) ||
          'ERROR: Enter the name of your cat',
      };
    case InputType.DATE:
      return {
        notEmpty: (value) =>
          (typeof value === 'string' && value.trim().length > 0) ||
          'ERROR: Enter the date of your cat',
      };
    case InputType.CHECKBOX: {
      return {
        notEmpty: (value) => value === true || 'ERROR: Choose consent to your personal data',
      };
    }
    case InputType.RADIO:
      return {
        notEmpty: (value) =>
          (typeof value === 'string' && value.trim().length > 0) ||
          'ERROR: Please choose gender of your cat',
      };
    case InputType.FILE:
      return {
        typeImg: (value) =>
          (value instanceof FileList && value.length > 0 && value[0].type.startsWith('image')) ||
          'ERROR: Choose your cat image',
      };
    case InputType.NUMBER:
      return {
        notEmpty: (value) =>
          (typeof value === 'string' && value.trim().length > 0) ||
          'ERROR: Enter correct value old of your cat',
      };

    case InputType.SELECT_ONE:
      return {
        notEmpty: (value) =>
          (typeof value === 'string' && value.trim().length > 0) ||
          'ERROR: Choose breeds of your cat',
      };
    case InputType.TEXTAREA:
      return {
        notEmpty: (value) =>
          (typeof value === 'string' && value.trim().length > 0) ||
          'ERROR: Enter description of your cat',
      };
    default:
      return {
        notEmpty: (value) =>
          (typeof value === 'string' && value.trim().length > 0) ||
          'ERROR: The field cannot be empty',
      };
  }
};

export default createOptionsObjectForRegister;
