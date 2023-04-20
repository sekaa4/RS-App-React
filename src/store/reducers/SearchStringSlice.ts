import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchStringState {
  value: string;
}

const initialState: SearchStringState = { value: '' };

export const searchStringSlice = createSlice({
  name: 'searchString',
  initialState,
  reducers: {
    writeSearchLine(state, action: PayloadAction<string>) {
      const curState = state;
      const value = action.payload;
      curState.value = value;
    },
  },
});

export default searchStringSlice.reducer;
