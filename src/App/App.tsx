import { Navigate, Route, Routes } from 'react-router-dom';
import { Home, About, NotFound } from 'pages';
import Layout from 'modules/layout';
import { PureComponent } from 'react';

export default class App extends PureComponent {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="about" element={<About />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="404" replace />} />
        </Route>
      </Routes>
    );
  }
}
