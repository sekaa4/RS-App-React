export const InputType = {
  TEXT: 'text',
  DATE: 'date',
  CHECKBOX: 'checkbox',
  FILE: 'file',
  RADIO: 'radio',
  SELECT_ONE: 'select-one',
  TEXTAREA: 'textarea',
  NUMBER: 'number',
  SUBMIT: 'submit',
  BUTTON: 'button',
} as const;

export type InputTypeOption = (typeof InputType)[keyof typeof InputType];
