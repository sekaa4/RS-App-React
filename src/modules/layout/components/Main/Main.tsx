import { PureComponent } from 'react';
import { Outlet } from 'react-router-dom';

export default class Main extends PureComponent {
  render() {
    return (
      <main>
        <Outlet />
      </main>
    );
  }
}
