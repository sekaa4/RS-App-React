/* eslint-disable no-param-reassign */
import CustomRefObject from 'models/CustomRefObject.type';
import { InputType } from 'models/InputType';

type ValidateArr = (CustomRefObject | React.RefObject<HTMLInputElement>[])[];
type ErrorObject = Record<keyof CustomRefObject, false | string>;
interface CheckedObj {
  name: keyof CustomRefObject;
  ref: React.RefObject<HTMLInputElement> | null;
  error: boolean;
}

const validateRadio = (
  objectRef: React.RefObject<HTMLInputElement>[],
  errObj: ErrorObject,
  refObj: CustomRefObject
) => {
  const checkedObj: CheckedObj = {
    name: '',
    ref: null,
    error: false,
  };
  objectRef.forEach((refRadio) => {
    if (refRadio.current) {
      const { checked, name } = refRadio.current;
      checkedObj.name = name;
      if (checked) {
        checkedObj.ref = refRadio;
        checkedObj.error = false;
      } else if (!checkedObj.ref) {
        checkedObj.error = true;
      }
    }
  });
  if (checkedObj.error) {
    errObj[checkedObj.name] = 'ERROR: Please choose gender of your cat';
  } else if (checkedObj.ref) {
    refObj[checkedObj.name] = checkedObj.ref;
    errObj[checkedObj.name] = false;
  }
};

const validateField = (objectRef: CustomRefObject, errObj: ErrorObject) => {
  Object.keys(objectRef).forEach((field) => {
    const { current } = objectRef[field];

    switch (current?.type) {
      case InputType.TEXT:
        errObj[field] = current.value ? false : 'ERROR: Enter the name of your cat';
        break;
      case InputType.DATE:
        errObj[field] = current.value ? false : 'ERROR: Enter the date of your cat';
        break;
      case InputType.CHECKBOX: {
        if (current instanceof HTMLInputElement) {
          errObj[field] = current.checked ? false : 'ERROR: Choose consent to your personal data';
        }
        break;
      }
      case InputType.RADIO:
        break;
      case InputType.FILE:
        errObj[field] = current.value ? false : 'ERROR: Choose your cat image';
        break;
      case InputType.NUMBER:
        errObj[field] =
          current.value && +current.value >= 0
            ? false
            : 'ERROR: Enter correct value old of your cat';
        break;
      case InputType.SELECT_ONE:
        errObj[field] = current.value ? false : 'ERROR: Choose breeds of your cat';
        break;
      case InputType.TEXTAREA:
        errObj[field] = current.value ? false : 'ERROR: Enter description of your cat';
        break;
      default:
        errObj[field] = 'ERROR: The field cannot be empty';
        break;
    }
  });
};

const checkValidValue = (
  validateArr: ValidateArr,
  refObject: CustomRefObject,
  errorObject: ErrorObject
) => {
  const errObj = errorObject;
  const refObj = refObject;

  validateArr.forEach((objectRef) => {
    if (Array.isArray(objectRef)) {
      validateRadio(objectRef, errObj, refObj);
    } else {
      validateField(objectRef, errObj);
    }
  });

  return { refObject: refObj, errorObject: errObj };
};

export default checkValidValue;
