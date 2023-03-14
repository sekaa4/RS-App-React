import { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends PureComponent {
  render() {
    return (
      <>
        <h2>It is 404 page</h2>
        <Link to="/">Go Home</Link>
      </>
    );
  }
}
