import { Route, Routes } from 'react-router-dom';
import { Home, About, Form, NotFound } from 'pages';
import Layout from 'modules/layout';
import Endpoints from 'models/Endpoints';

const App = () => {
  return (
    <Routes>
      <Route path={Endpoints.MAIN} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={Endpoints.HOME} element={<Home />} />
        <Route path={Endpoints.ABOUT} element={<About />} />
        <Route path={Endpoints.FORM} element={<Form />} />
        <Route path={Endpoints.NOT_FOUND} element={<NotFound />} />
        <Route path={Endpoints.All} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
