import { Component, PureComponent } from 'react';
import { Outlet } from 'react-router-dom';

class Main extends PureComponent {
  render() {
    return (
      <main>
        <Outlet />
      </main>
    );
  }
}

export default Main;
