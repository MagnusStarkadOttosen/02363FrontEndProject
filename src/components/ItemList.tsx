import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext.tsx";
import ItemComponent from "./ItemComponent";
import { Item } from "../types/Items";
import { Table } from "react-bootstrap";

const ItemList: React.FC = () => {
  //Hook for the list of items.
  const [items, setItems] = useState<Item[]>([]);
  //Hook for tracking the subtotal for each item based on its quantity.
  const [subtotals, setSubtotals] = useState<{ [key: string]: number }>({});
  //Hook for the total price of all items.
  const navigate = useNavigate();
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContext not found");
  }
  //The total price for all items
  let total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  let discount = items.reduce((acc, item) => {
    let a = 0;
    if (item.quantity >= item.rebateQuantity) {
      a = (item.price * item.rebatePercent * item.quantity) / 100;
    }
    return acc + a;
  }, 0);
    //10% discount if you but more than 300DKK
    if ((total-discount) > 300) {
      discount += (total - discount) * 0.10;
       
    } 

  const { setListItems } = context;

  useEffect(() => {
    console.log('change');
    setListItems(items);
  }, [items]);
   
  
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
  

const handleSubstitute = (currentItemId: string) => {
  setItems(prevItems => {
    return prevItems.map(item => {
      if (item.id === currentItemId) {
        const newItem = findSubstitute(item); // Finds the substitute item.
        if (newItem) {
          return { ...item, substituteItem: newItem }; // Updates the item with substitute item's properties.
        }
      }
      return item; // Returns the item unchanged if no substitute is found.
    });
  });
};


  //This calculates the initial subtotal for each item.
  useEffect(() => {
    const initialSubtotals = items.reduce((acc, item) => {
      acc[item.id] = item.price;
      return acc;
    }, {} as { [key: string]: number });
    setSubtotals(initialSubtotals);

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: Item[] = await response.json();
        setItems(data.map((item) => {
          item.quantity = 1;
          return item;
        }));
        //   setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        //   setLoading(false);
      }
    };

    fetchData();
  }, []);

  //Function to removes an item.
  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    const newSubtotals = { ...subtotals };
    delete newSubtotals[id];
    setSubtotals(newSubtotals);
  };

  //Function to handle changes in an items quantity.
  const handleQuantityChange = (id: string, subtotal: number) => {
    // console.log(id + ' _ ' + subtotal);
    let updatedItems = [...items];
    const currentItemIndex = updatedItems.findIndex((item) => item.id === id);
    if (currentItemIndex > -1) {
      updatedItems[currentItemIndex].quantity = subtotal;
    }
    setItems(updatedItems);
    setSubtotals({ ...subtotals, [id]: subtotal });
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
          width: "90%",
          maxWidth: "1000px",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "70%" }}>
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
        <div style={{ flex: 1 }}>
          <div
            className="totalprice"
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "100px",
              border: "2px gray double",
              borderRadius: "10px",
              height: "400px",
              width: "300px",
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
                  <td className="a">
                    {" "}
                    {items.reduce(
                      (acc, it) => acc + it.quantity,
                      0
                    )} products:{" "}
                  </td>
                  <td className="b"> ${total.toFixed(2)} </td>
                </tr>
                <tr>
                  <td className="a">Total discount:</td>
                  <td className="b"> ${discount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="a">Total: </td>
                  <td className="b"> ${(total - discount).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
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
