import GenderType from './Gender.type';

interface Data {
  id: number;
  name: string;
  body: string;
  birthDate: string;
  age: number;
  gender: GenderType;
  breeds: string;
  img: string;
}

export default Data;
