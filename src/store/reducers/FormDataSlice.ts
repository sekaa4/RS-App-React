import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Data from 'models/Data.type';

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
