import { AppProvider } from './components/AppContext.tsx';
import AppRoutes from './components/AppRoutes';
import "./App.css";

function App() {
  return (
    <AppProvider>
     <AppRoutes/>
    </AppProvider>
  );
}

export default App;
