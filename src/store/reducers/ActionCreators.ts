import { createAsyncThunk } from '@reduxjs/toolkit';
import URLConstants from 'models/URLConstants';

// const fetchMainData = (value: string) => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(mainDataSlice.actions.mainDataFetching());
//     const res = await fetch(`${URLConstants.BASE_URL}?q=${value}`);
//     const newData: Data[] = await res.json();
//     dispatch(mainDataSlice.actions.mainDataSuccess(newData));
//   } catch (err) {
//     if (err instanceof Error) {
//       dispatch(mainDataSlice.actions.mainDataError(err.message));
//     }
//   }
// };

const fetchMainData = createAsyncThunk('mainData/fetchAll', async (value: string, thunkAPI) => {
  try {
    const res = await fetch(`${URLConstants.BASE_URL}?q=${value}`);
    if (!res.ok) {
      throw new Error();
    }
    return await res.json();
  } catch (err) {
    return thunkAPI.rejectWithValue('Error load Data');
  }
});

export default fetchMainData;
