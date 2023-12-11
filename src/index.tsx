import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CellList from './components/cellList';

const App = () => {
  
  return (
  <Provider store={store}>
    <div>
      <CellList />
    </div>
  </Provider>
  )
}

ReactDom.render(<App />,document.querySelector('#root'))