import * as rtkQuery from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Data from 'models/Data.type';

type TypeRtkQuery = typeof rtkQuery & { default?: unknown };

const { createSlice } = ((rtkQuery as TypeRtkQuery).default ?? rtkQuery) as typeof rtkQuery;

interface FormContainerState {
  dataForm: Data[];
}

const initialState: FormContainerState = {
  dataForm: [],
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    writeFormData(state, action: PayloadAction<Data>) {
      const curState = state;
      curState.dataForm = [...curState.dataForm, action.payload];
    },
  },
});

export default formDataSlice.reducer;
