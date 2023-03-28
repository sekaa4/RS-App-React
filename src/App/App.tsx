import { Navigate, Route, Routes } from 'react-router-dom';
import { Home, About, Form, NotFound } from 'pages';
import Layout from 'modules/layout';
import Endpoints from 'models/Endpoints';

const App = () => {
  return (
    <Routes>
      <Route path={Endpoints.MAIN} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={Endpoints.HOME} element={<Navigate to={Endpoints.MAIN} replace />} />
        <Route path={Endpoints.ABOUT} element={<About />} />
        <Route path={Endpoints.FORM} element={<Form />} />
        <Route path={Endpoints.NOT_FOUND} element={<NotFound />} />
        <Route path={Endpoints.All} element={<Navigate to={Endpoints.NOT_FOUND} replace />} />
      </Route>
    </Routes>
  );
};

export default App;
