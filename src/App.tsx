import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Router } from './routers/Router';
import { Header } from './components/organisms/Header';

function App() {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
