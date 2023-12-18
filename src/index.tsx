import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import App from './App';

const Index = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(Index());
