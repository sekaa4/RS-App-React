const gender = {
  MALE: 'male',
  FEMALE: 'female',
} as const;

type ValueOf<T> = T[keyof T];

type GenderType = ValueOf<typeof gender>;

export default GenderType;
