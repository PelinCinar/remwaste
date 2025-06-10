import { Provider } from 'react-redux';
import { store } from './redux';
import SkipSelection from './pages/SkipSelection';

function App() {
  return (
    <Provider store={store}>
      <SkipSelection />
    </Provider>
  );
}

export default App;
