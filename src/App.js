import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Routes from './routes';
import Sidebar from './Components/Sidebar'

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
