/* eslint-disable react/no-danger */
import { PropsWithChildren } from 'react';
import { RootState } from 'store/store';

interface HTMLState {
  state: RootState;
}

const HTML = (props: PropsWithChildren<HTMLState>) => {
  const { children, state } = props;

  const script = `
    window.PRELOADEDSTATE = ${JSON.stringify(state)};
  `;
  return (
    <>
      <div id="root">{children}</div>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
};

export default HTML;
