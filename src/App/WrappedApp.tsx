import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setupStore } from 'store/store';
import App from './App';

const WrappedApp = () => {
  const store = setupStore(window.PRELOADEDSTATE);

  delete window.PRELOADEDSTATE;

  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};

export default WrappedApp;
