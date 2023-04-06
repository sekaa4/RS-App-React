import { withRouter } from 'utils/withRouterHOC';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';

const Layout = () => {
  const HeaderWithRouterProps = withRouter(Header);

  return (
    <>
      <HeaderWithRouterProps />
      <Main />
      <Footer />
    </>
  );
};

export default Layout;
