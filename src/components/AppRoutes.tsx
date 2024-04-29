// AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemList from './ItemList';
import BillingAndDelivery from './billingAndDelivery';
import PaymentMethod from './PaymentMethod';
import ConfirmOrderView from './ConfirmOrderView';
import { FormProvider } from "../context/FormContext"

const AppRoutes = () => {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/items" element={<ItemList />} />
          <Route path="/billing" element={<BillingAndDelivery />} />
          <Route path="/payment" element={<PaymentMethod totalAmount={0} />} />
          <Route path="/confirm" element={<ConfirmOrderView />} />
          <Route path="/" element={<ItemList />} />
        </Routes>
      </Router>
    </FormProvider>
  );
};

export default AppRoutes;
