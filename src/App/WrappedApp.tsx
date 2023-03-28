import { BrowserRouter } from 'react-router-dom';
import App from './App';

const WrappedApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default WrappedApp;
