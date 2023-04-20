/* eslint-disable import/no-extraneous-dependencies */
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { AppStore, RootState, setupStore } from 'store/store';
import { PreloadedState } from '@reduxjs/toolkit';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export default function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
