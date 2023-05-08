import * as rtkQuery from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type TypeRtkQuery = typeof rtkQuery & { default?: unknown };

const { createSlice } = ((rtkQuery as TypeRtkQuery).default ?? rtkQuery) as typeof rtkQuery;

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
