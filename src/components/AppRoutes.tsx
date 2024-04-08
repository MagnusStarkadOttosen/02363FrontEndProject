// AppRoutes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemList from './ItemList';
import BillingAndDelivery from './BillingAndDelivery';
import PaymentMethod from './PaymentMethod';
import ConfirmOrderView from './ConfirmOrderView';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/items" element={<ItemList />} />
        <Route path="/billing" element={<BillingAndDelivery />} />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/confirm" element={<ConfirmOrderView />} />
        <Route path="/" element={<ItemList />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
