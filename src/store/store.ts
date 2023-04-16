import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import cardDataAPI from 'services/CardDataService';
import searchLineReducer from './reducers/SearchStringSlice';
import formDataReducer from './reducers/FormDataSlice';

const rootReducer = combineReducers({
  searchLineReducer,
  formDataReducer,
  [cardDataAPI.reducerPath]: cardDataAPI.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cardDataAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
