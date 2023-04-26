/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import fsp from 'node:fs/promises';
import express from 'express';
import { ViteDevServer } from 'vite';
import { PipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

const templateHtml = isProduction ? await fsp.readFile('./dist/client/index.html', 'utf-8') : '';

const app = express();

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
  const sirv = (await import('sirv')).default;
  app.use(
    sirv('dist/client', {
      gzip: true,
    })
  );
}

app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl;

    let template: string;
    let render: (
      url: string,
      opts: RenderToPipeableStreamOptions
    ) => Promise<{ html: PipeableStream }>;

    if (!isProduction) {
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

    const {
      html: { pipe },
    } = await render(url, {
      onShellReady() {
        pipe(res);
      },
      onShellError() {},
      onAllReady() {
        res.write(parts[1]);
        res.end();
      },
      onError(err) {
        console.error(err);
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

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
