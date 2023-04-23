/* eslint-disable import/prefer-default-export */
import App from 'App/App';
import { renderToPipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { setupStore } from 'store/store';
import cardDataAPI from 'services/CardDataService';
import HTML from 'HTML';
import React from 'react';

export async function render(url: string, opts: RenderToPipeableStreamOptions) {
  const store = setupStore();

  store.dispatch(cardDataAPI.util.prefetch('fetchAllCardData', '', {}));
  await Promise.all(store.dispatch(cardDataAPI.util.getRunningQueriesThunk()));

  const preloadedState = store.getState();

  const html = renderToPipeableStream(
    <React.StrictMode>
      <HTML state={preloadedState}>
        <Provider store={store}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </Provider>
      </HTML>
    </React.StrictMode>,
    opts
  );

  return { html };
}
