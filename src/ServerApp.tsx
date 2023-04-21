/* eslint-disable import/prefer-default-export */
import App from 'App/App';
import React from 'react';
import { renderToPipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { setupStore } from 'store/store';

const store = setupStore();

export function render(url: string, opts: RenderToPipeableStreamOptions) {
  const html = renderToPipeableStream(
    <React.StrictMode>
      <StaticRouter location={url}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    </React.StrictMode>,
    opts
  );
  return html;
}
