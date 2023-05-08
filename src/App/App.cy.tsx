import { mount } from '@cypress/react18';
import React from 'react';
import WrappedApp from './WrappedApp.jsx';

describe('<WrappedApp>', () => {
  it('mounts', () => {
    mount(<WrappedApp />);
  });
});
