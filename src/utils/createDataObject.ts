import Data from 'models/Data.type';
import FormInput from 'models/FormInput';
import getObjWithCorrectField from './getObjWithCorrectField';

const createDataObject = (data: FormInput): Data => {
  const keys = Object.keys(data) as (keyof typeof data)[];
  const dataObj = keys.reduce((acc, field) => {
    const current = data[field];
    return getObjWithCorrectField(acc, field, current);
  }, {} as Data);

  dataObj.id = Date.now();
  return dataObj;
};

export default createDataObject;
