
import React from 'react';
import { AppProvider } from './components/AppContext';
import AppRoutes from './components/AppRoutes';


function App() {
  

  return (

    <AppProvider>
     <AppRoutes/>
    </AppProvider>
   
  );
}

export default App;
