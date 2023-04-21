/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/no-extraneous-dependencies */
import fsp from 'node:fs/promises';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ViteDevServer } from 'vite';
import { PipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';
const dirname = path.dirname(fileURLToPath(import.meta.url));

// Cached production assets
const templateHtml = isProduction ? await fsp.readFile('./dist/client/index.html', 'utf-8') : '';

// Create http server
const app = express();

app.use('/assets', express.static(path.resolve(dirname, './dist/client/assets')));

// Add Vite or respective production middlewares
let vite: ViteDevServer;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));
}

// Serve HTML
app.use('/assets', express.static(path.resolve(dirname, './dist/client/assets')));

app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl;

    let template: string;
    let render: (url: string, opts: RenderToPipeableStreamOptions) => PipeableStream;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fsp.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/ServerApp.tsx')).render;
    } else {
      template = templateHtml;
      // @ts-ignore
      render = (await import('./dist/server/ServerApp')).render;
    }
    const parts = template.split('<!--app-html-->');

    res.write(parts[0]);
    const stream = render(url, {
      onShellReady() {
        stream.pipe(res);
      },
      onShellError() {
        // do error handling
      },
      onAllReady() {
        res.write(parts[1]);
        res.end();
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      vite?.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
