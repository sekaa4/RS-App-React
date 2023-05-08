import Data from 'models/Data.type';
import FormInput from 'models/FormInput';
import FormPropName from 'models/FormPropName';

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

export default getObjWithCorrectField;
