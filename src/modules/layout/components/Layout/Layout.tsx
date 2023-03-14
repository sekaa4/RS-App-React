import { PureComponent } from 'react';
import { withRouter } from 'utils/withRouterHOC';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';

export default class Layout extends PureComponent {
  render() {
    const HeaderWithRouterProps = withRouter(Header);
    return (
      <>
        <HeaderWithRouterProps />
        <Main />
        <Footer />
      </>
    );
  }
}
