import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setupStore } from 'store/store';
import App from './App';

const store = setupStore();

const WrappedApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};

export default WrappedApp;
