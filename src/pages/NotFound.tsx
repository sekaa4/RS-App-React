import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1>It is 404 page</h1>
      <Link to="/">Go Home</Link>
    </>
  );
}

export default NotFound;
