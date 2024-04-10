import React, { useState, useEffect } from "react";
import { Item } from "../types/Items";
import { Button } from "react-bootstrap";

interface ItemProps {
  item: Item;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  // onFindSubstitute: (currentItem: Item) => Item | undefined;
  handleSubstitute: (itemId: string) => void;
 
}

const ItemComponent: React.FC<ItemProps> = ({
  item,
  onRemove,
  onQuantityChange,
//   handleSubstitute,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [gift, setGift] = useState(false);
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  let subTotal = item.price * quantity;
  let totalDiscount = 0;

  if (quantity >= item.rebateQuantity) {
    const discountInDecimal = item.rebatePercent / 100;
    totalDiscount = subTotal * discountInDecimal;
    subTotal -= totalDiscount;
  }

  useEffect(() => {
    onQuantityChange(item.id, quantity);
  }, [item.id, quantity, onQuantityChange]);

  return (
    <tr>
      <td>
        <div>
          <div>
            <img src={item.imageUrl} alt="Image" width="100" height="100" />
          </div>
        
          {/*item.substituteItem ? (
            <div
              onClick={() => handleSubstitute(item.id)}
              style={{ cursor: "pointer", color: "blue" }}
            >
              {item.substituteItem.id}
            </div>
          ) : (
            <div></div>
          )*/}
   
        </div>
      </td>
      <td>
        <span> {item.name} </span>
      </td>
      <td>
        <span>
          <label>
            Gift wrap{" "}
            <input
              type="checkbox"
              checked={gift}
              onChange={(e) => setGift(e.target.checked)}
            />
          </label>
        </span>
      </td>
      <td>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button onClick={decreaseQuantity}>-</button>
          <input //Input field for quantity.
            type="number"
            value={quantity} //Input value bound to components quantity.
            onChange={(e) => setQuantity(Number(e.target.value) || 0)} //Update quantity state if quantity is changed.
            style={{ textAlign: "center", width: "30px", margin: "0 5px" }}
            min="1" //Set the minimun number to 1.
          />
          <button onClick={increaseQuantity}>+</button>
        </div>

        <td>
          {" " +
            item.rebatePercent +
            "% discount for " +
            item.rebateQuantity +
            "pcs, "}{" "}
          {/*Button to remove the item.*/}
        </td>
      </td>
      <td>
        <td>
          {" " + subTotal.toFixed(2)} {/*Display the subtotal.*/}
        </td>
        <tr className="discount">
          {"( " + totalDiscount.toFixed(2) + ")"} {/*Display the subtotal.*/}
        </tr>
      </td>
      <td>
        <span>
          <Button onClick={() => onRemove(item.id)}>🗑️</Button>
        </span>{" "}
        {/*Button to remove the item.*/}
      </td>
    </tr>
  );
};
export default ItemComponent;
