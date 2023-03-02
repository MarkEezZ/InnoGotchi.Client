import ReactDOM from 'react-dom/client';
import Provider from 'react-redux/es/components/Provider';
import { store } from './store';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />    
  </Provider>
);
