import Data from 'models/Data.type';
import URLConstants from 'models/URLConstants';
import { AppDispatch } from 'store/store';
import { mainDataSlice } from './MainDataSlice';

const fetchMainData = (value: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(mainDataSlice.actions.mainDataFetching());
    const res = await fetch(`${URLConstants.BASE_URL}?q=${value}`);
    const newData: Data[] = await res.json();
    dispatch(mainDataSlice.actions.mainDataSuccess(newData));
  } catch (err) {
    if (err instanceof Error) {
      dispatch(mainDataSlice.actions.mainDataError(err.message));
    }
  }
};

export default fetchMainData;
