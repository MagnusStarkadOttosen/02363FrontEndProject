import './App.css'
import ItemList from './components/ItemList';
import BillingAndDelivery from './components/BillingAndDelivery';

function App() {
  
  return (

    <div className="row">

      <div className="ItemListArea">
        <ItemList />
      </div>

      <div className="InfoArea">

        <div className = "TotalArea">
          placeholder for total price
        </div>

        <div className="BillingAndDeliveryArea">
          <BillingAndDelivery />
        </div>

      </div>


    </div>
  );
}

export default App
