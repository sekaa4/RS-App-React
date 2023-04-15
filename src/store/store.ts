import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cardDataAPI from 'services/CardDataService';
import searchLineReducer from './reducers/SearchStringSlice';
import formDataReducer from './reducers/FormDataSlice';

const rootReducer = combineReducers({
  searchLineReducer,
  formDataReducer,
  [cardDataAPI.reducerPath]: cardDataAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cardDataAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
