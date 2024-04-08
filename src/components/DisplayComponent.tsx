import { useState } from "react";
import ItemList from "./ItemList";
import BillingAndDelivery from "./billingAndDelivery";
import PaymentMethod from "./PaymentMethod";
import ConfirmOrderView from "./ConfirmOrderView";

function DisplayComponent() {
  const [status, setStatus] = useState("ProductSelection");

  function goToAddress() {
    setStatus("Address");
  }

  function goToPaymentMethod() {
    setStatus("PaymentMethod");
  }

  function goToOrderConfirmation() {
    setStatus("OrderConfirmation");
  }

  function goToProductSelection() {
    setStatus("ProductSelection");
  }

  switch (status) {
    case "ProductSelection":
      return (
        <div>
          <ItemList />
          <button onClick={goToAddress}>Next</button>
        </div>
      );
    case "Address":
      return (
        <div>
          <BillingAndDelivery />
          <button onClick={goToProductSelection}>Back</button>
          <button onClick={goToPaymentMethod}>Next</button>
        </div>
      );
    case "PaymentMethod":
      return (
        <div>
          <PaymentMethod totalAmount={0} />
          <button onClick={goToAddress}>Back</button>
          <button onClick={goToOrderConfirmation}>Next</button>
        </div>
      );
    case "OrderConfirmation":
      return (
        <div>
          <ConfirmOrderView />
          <button onClick={goToProductSelection}>New order</button>
        </div>
      );
    default:
      return <div>Invalid status</div>;
  }
}

export default DisplayComponent;
