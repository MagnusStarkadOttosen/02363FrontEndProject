import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import { Table } from "react-bootstrap";

const ConfirmOrderView:React.FC = () => {
    const navigate = useNavigate();
    const context = useContext(AppContext);
    if (!context) {
      throw new Error(
        "AppContext is null, make sure it is provided by a provider"
      );
    }  
    const {totalAmount} = context;
    const {listItem} = context;
    const{paymentMethod} = context;
   


  
    const handleNext = () => {
        navigate("/items");
      };


// return list of items
    return (
    <div style={{width:"100vw", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
    
        <h1>Order Confirmed</h1>
        <h2>List Of Products</h2>
        <table>
        <tbody>
        <tr>
          <td>
            <div className="product_area">
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th></th>
                    <th></th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {listItem.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.amount}</td>
                            <td>${item.price}</td>
                            <td>${item.amount * item.price}</td>
                        </tr>
                    ))}  
                   
                </tbody>
            </Table>
            </div>
            </td>
        </tr>

        </tbody>
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
        <p>Payment Method: {paymentMethod}</p>  
        <p>Thank you for your order. Your order is confirmed and will be shipped.</p>
        </table>
        <div  style={{display:"flex", justifyContent:"end", width:"100%", marginRight:"10px"}}>
        <button onClick={handleNext}>Make a new order</button>
        </div>
    </div>

    );
}
export default ConfirmOrderView;