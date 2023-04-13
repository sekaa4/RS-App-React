import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Data from 'models/Data.type';

interface MainDataState {
  mainData: Data[];
  isLoading: boolean;
  error: string;
}

const initialState: MainDataState = {
  mainData: [],
  isLoading: false,
  error: '',
};

export const mainDataSlice = createSlice({
  name: 'mainData',
  initialState,
  reducers: {
    mainDataFetching(state) {
      const curState = state;
      curState.isLoading = true;
    },
    mainDataSuccess(state, action: PayloadAction<Data[]>) {
      const curState = state;
      curState.mainData = action.payload;
      curState.error = '';
      curState.isLoading = false;
    },
    mainDataError(state, action: PayloadAction<string>) {
      const curState = state;
      curState.mainData = [];
      curState.error = action.payload;
      curState.isLoading = false;
    },
  },
});

export default mainDataSlice.reducer;
