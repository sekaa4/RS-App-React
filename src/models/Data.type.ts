import GenderType from './Gender.type';

interface Data {
  userId: number;
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
