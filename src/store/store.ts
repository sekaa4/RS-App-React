import { combineReducers, configureStore } from '@reduxjs/toolkit';
import mainDataReducer from './reducers/MainDataSlice';
import searchLineReducer from './reducers/SearchStringSlice';

const rootReducer = combineReducers({ mainDataReducer, searchLineReducer });

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
