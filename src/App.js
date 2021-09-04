import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes from './routes';
import Sidebar from './Components/Sidebar'

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Sidebar />
        <Routes />
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;
