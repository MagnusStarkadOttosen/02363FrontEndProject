import React from 'react';
import { AppProvider } from './components/AppContext.tsx';
import AppRoutes from './components/AppRoutes';
import "./App.css";

function App() {
  

  return (
    <AppProvider>
     <AppRoutes/>
    </AppProvider>
//     //<DisplayComponent />

//     <div className="row">

//       <div className="ItemListArea">
//         <ItemList />
//       </div>

//       <div className="InfoArea">
//         {/*
//         <div className="TotalArea">
//           placeholder for total price
//         </div>
//         */}
//         <div className="BillingAndDeliveryArea">
//           <BillingAndDelivery />
//         </div>

//       </div>

//     </div>
  );
}

export default App;
