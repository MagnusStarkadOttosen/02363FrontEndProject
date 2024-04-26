import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import ItemComponent from "./ItemComponent";
import { Item } from "../types/Items";
import { Table } from "react-bootstrap";
import image1 from "../assets/images/d3-vitamin.jpeg";
import image2 from "../assets/images/c-vitamin-500.jpeg";
import image3 from "../assets/images/c-vitamin-depot.jpeg";
import image4 from "../assets/images/omega.jpeg";
import { i } from "vitest/dist/reporters-MmQN-57K.js";

/**
 * This is the hardcoded list of initial items.
 */
const initItems: Item[] = [
  {
    id: "vitamin-d-90-100",
    name: "D-vitamin, 90ug, 100 stk",
    type: "D-vitamin",
    offer: "",
    substituteItem: null,
    imageSrc: image1,
    price: 116,
    amount: 0,
    rebateQuantity: 3,
    rebatePercent: 10,
    gift: false,
  },
  {
    id: "vitamin-c-500-250",
    name: "C-vitamin, 500mg, 240 stk",
    type: "C-vitamin",
    offer: "",
    substituteItem: null,
    imageSrc: image2,
    amount: 0,
    rebateQuantity: 3,
    rebatePercent: 10,
    price: 150,
    gift: false,
  },
  {
    id: "vitamin-c-depot-500-250",
    name: "C-vitamin Depot, 500mg, 240 stk",
    type: "C-vitamin",
    offer: "",
    substituteItem: null,
    imageSrc: image3,
    amount: 0,
    rebateQuantity: 3,
    rebatePercent: 10,
    price: 175,
    gift: false,
  },
  {
    id: "fish-oil-1000-120",
    name: "Omega 3 fiskeolie, 1000mg, 120 stk",
    type: "Omega",
    offer: "",
    substituteItem: null,
    imageSrc: image4,
    amount: 0,
    rebateQuantity: 3,
    rebatePercent: 10,
    price: 69,
    gift: false,
  },
];

const ItemList: React.FC = () => {
  //Hook for the list of items.
  const [items, setItems] = useState<Item[]>(initItems);
  //Hook for tracking the subtotal for each item based on its quantity.
  const [subtotals, setSubtotals] = useState<{ [key: string]: number }>({});
  //Hook for the total price of all items.
  const navigate = useNavigate();
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContext not found");
  }

  const { setTotalAmount } = context;
  const { setListItems } = context;

  useEffect(() => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.amount,
      0
    );
    setTotalAmount(total);
    setListItems(items.filter((item) => item.amount > 0));
  }, [items, setTotalAmount]);

  const findSubstitute = (currentItem: Item): Item | undefined => {
    //Filters the items to find the ones with the same type and a higher price.
    let substitutes = items.filter(
      (item) => item.type === currentItem.type && item.price > currentItem.price
    );
    //Sorts the substitutes by price and returns the first one.
    substitutes.sort((a, b) => a.price - b.price);

    return substitutes[0];
  };
  //Function to handle the substitute button.
  const handleSubstitute = (currentItemId: string): Item | undefined => {
    const currentItem = items.find((item) => item.id === currentItemId); //Finds the current item.
    const newItem = currentItem ? findSubstitute(currentItem) : undefined; //Finds the substitute.
    if (currentItem && newItem) {
      currentItem.substituteItem = newItem;
    }
    return newItem;
  };
  // function to handle the list of items
  const handleItemList = (currentItemId: string) => {
    let updatedItems = [...items];
    const currentItemIndex = updatedItems.findIndex(
      (item) => item.id === currentItemId
    );
    if (currentItemIndex > -1) {
      const currentItem = updatedItems[currentItemIndex];
      const newItemIndex = updatedItems.findIndex(
        (item) =>
          item.id === currentItem.substituteItem?.id &&
          item.price === currentItem.substituteItem?.price
      );
      if (newItemIndex > -1) {
        updatedItems[newItemIndex].amount =
          updatedItems[currentItemIndex].amount + 1;
        updatedItems.splice(newItemIndex, 1);
      }
    }
    setItems(updatedItems);
  };

  items.forEach((item) => {
    handleSubstitute(item.id);
  });

  //This calculates the initial subtotal for each item.
  useEffect(() => {
    const initialSubtotals = initItems.reduce((acc, item) => {
      acc[item.id] = item.price;
      return acc;
    }, {} as { [key: string]: number });
    setSubtotals(initialSubtotals);
  }, []);

  //Function to removes an item.
  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    const newSubtotals = { ...subtotals };
    delete newSubtotals[id];
    setSubtotals(newSubtotals);
  };

  let totalProducts = 0;
  let discount = 0;
  let totalAmount = 0;
  let total = 0;
  //Function to handle changes in an items quantity.
  //This also updates the subtotal for the specified item.
  const handleQuantityChange = (id: string, subtotal: number) => {
    setSubtotals({ ...subtotals, [id]: subtotal });
    totalProducts = 0;
    items.forEach((item) => {
      totalProducts += item.amount;
    });
    //The total price for all items
    total = Object.values(subtotals).reduce((acc, curr) => acc + curr, 0);
    console.log(total);
    discount = 0;
    totalAmount = 0;
    if (total > 300) {
      discount = total;
      totalAmount = total * 0.9;
      discount = discount - totalAmount;
    } else {
      totalAmount = total;
    }
    console.log(total);
  };

  const handleNext = () => navigate("/billing");

  //Maps each item to an itemComponent and display the total price.
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>List Of Products</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
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
                    {items.map((item) => (
                      <ItemComponent
                        key={item.id}
                        item={item}
                        onRemove={removeItem}
                        onQuantityChange={handleQuantityChange}
                        handleSubstitute={() => handleSubstitute(item.id)}
                      />
                    ))}
                  </tbody>
                </Table>
              </div>
            </td>
          </tr>
        </tbody>
        <div
          className="totalprice"
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "100px",
            border: "2px gray double",
            borderRadius: "10px",
            height: "400px",
            width: "25%",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              display: "flex",
              marginTop: "-250px",
              justifyContent: "center",
            }}
          >
            {" "}
            Total price{" "}
          </h2>
          <table>
            <tbody>
              <tr>
                <td className="a"> {totalProducts} products: </td>
                <td className="b"> ${total.toFixed(2)} </td>
              </tr>
              <tr>
                <td className="a">Total discount:</td>
                <td className="b"> ${discount.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="a">Total: </td>
                <td className="b"> ${totalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          width: "100%",
          marginRight: "10px",
        }}
      >
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default ItemList;
