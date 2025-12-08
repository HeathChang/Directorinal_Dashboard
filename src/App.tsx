import { BrowserRouter } from 'react-router-dom';
import { Router } from './routers/Router';
import { Header } from './components/organisms/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  );
}

export default App;
