import * as rtkQuery from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import cardDataAPI from 'services/CardDataService';
import searchLineReducer from './reducers/SearchStringSlice';
import formDataReducer from './reducers/FormDataSlice';

type TypeRtkQuery = typeof rtkQuery & { default?: unknown };

const { combineReducers, configureStore } = ((rtkQuery as TypeRtkQuery).default ??
  rtkQuery) as typeof rtkQuery;

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
