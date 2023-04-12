import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Data from 'models/Data.type';

interface MainDataState {
  mainData: Data[];
}

const initialState: MainDataState = {
  mainData: [],
};

export const mainDataSlice = createSlice({
  name: 'mainData',
  initialState,
  reducers: {
    writeMainData(state, action: PayloadAction<Data[]>) {
      const curState = state;
      curState.mainData = [...action.payload];
    },
  },
});

export default mainDataSlice.reducer;
