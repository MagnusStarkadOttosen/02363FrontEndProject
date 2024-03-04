import React, { useState , useEffect } from 'react';
import { Item } from '../types/Items';

//Interface with the items properties.
interface ItemProps{
    item: Item; //The details of what the item contains.
    onRemove: (id: string) => void; //Function thats called when removing items.
    onQuantityChange: (id: string, subtotal: number) => void; //Function thats called when updating quantity.
}

const ItemComponent: React.FC<ItemProps> = ({ item, onRemove, onQuantityChange }) => {
    //Tracking quantity defaults to 1.
    const [quantity, setQuantity] = useState(1);
    const [gift, setGift] = useState(0);
    //Calculates the subtotal based on quantity.
    let subTotal = item.price * quantity;
    let totalDiscount = 0;
    //total amount per item to buy
    item.amount = quantity;
    //Hook to call onQuantityChange when quantity changes.
    //This informes ItemList of the changes
    useEffect(() => {
        onQuantityChange(item.id, subTotal);
    }, [quantity]); //"quantity" in [] means this effect runs then "quantity" changes.

    //calculate discount per item
    if(item.amount >= item.rebateQuantity){
        totalDiscount = subTotal;
        const discountInDecimal = item.rebatePercent / 100;
        subTotal = subTotal * (1 - discountInDecimal);
        totalDiscount = totalDiscount - subTotal;
    }
    //What is shown for each item.
    return(
        <div className="item">
            <button onClick={()=> onRemove(item.id)}>X</button> {/*Button to remove the item.*/} 
            <span>
                {item.name} {/*The name of the item*/}
            </span>
            <span>
                {", " + item.rebatePercent + "% discount for " + item.rebateQuantity + "pcs, "} {/*Button to remove the item.*/}
            </span>
        
            <span>
                {"Price: $" + item.price.toFixed(2)} {/*Button to remove the item.*/}
            </span>
            <input //The input for quantity.
                type="number"
                value={quantity} //Input value bound to components quantity.
                onChange={(e) => setQuantity(Number(e.target.value))} //Update quantity state if quantity is changed.
                min="1" //Set the minimun number to 1.
            />
            <label>Gift wrap:<input type="checkbox" value={gift} onChange={(e) => setGift(Number(e.target.value))}/></label>
            <span>
                {"Subtotal: $" + subTotal.toFixed(2)} {/*Display the subtotal.*/}
            </span>
            
            <span>
                {"Discount: $" + totalDiscount.toFixed(2)} {/*Display the subtotal.*/}
            </span>
        </div>
    )
}

export default ItemComponent;