import React, { useState, useEffect } from 'react';
import { Item } from '../types/Items';
import { Button, Col } from 'react-bootstrap';

//Interface with the items properties.
interface ItemProps {
    item: Item; //The details of what the item contains.
    onRemove: (id: string) => void; //Function thats called when removing items.
    onQuantityChange: (id: string, subtotal: number) => void; //Function thats called when updating quantity.
    onFindSubstitute: (currentItem: Item) => void;
    handleSubstitute: (itemId: string) => void;
  
}


const ItemComponent: React.FC<ItemProps> = ({ item, onRemove, onQuantityChange,handleSubstitute }) => {  
    //Tracking quantity defaults to 1.
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => prev > 0 ? prev - 1 : 0);
    const [gift, setGift] = useState(false);
    const substituteItemId = item.substituteItem?.id;

    //Calculates the subtotal based on quantity.
    let subTotal = item.price * quantity;
    let totalDiscount = 0;
    //total amount per item to buy
    item.amount = quantity;
    //Hook to call onQuantityChange when quantity changes.
    //This informes ItemList of the changes
            useEffect(() => {
                // if (substituteItemId) {
                //     onFindSubstitute(item);
                // }
                onQuantityChange(item.id, subTotal);//The hook is called when quantity or subTotal changes.
                
            }, [ quantity, subTotal,substituteItemId]); //The hook is called when quantity or subTotal changes.
            {
                //calculate discount per item
                if (item.amount >= item.rebateQuantity) {
                    totalDiscount = subTotal;
                    const discountInDecimal = item.rebatePercent / 100;
                    subTotal = subTotal * (1 - discountInDecimal);
                    totalDiscount = totalDiscount - subTotal;
                }
            }

    //What is shown for each item.

    return (
        //The item details.
            <tr>
                <td>
                     <img src={item.imageSrc} alt="Image" width="60" height="60" />
                
                    <label>
                        {item.substituteItem && (
                            <div onClick={() => handleSubstitute(item.id)} style={{ cursor: 'pointer', color: 'blue' }}>
                                Substitute offer: {item.substituteItem.id}
                                
                            </div>
                        )}
                    </label>
                </td>
                <td><span> {item.name} </span></td>
                <td>
                    <span>
                    <label>Gift wrap <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} /></label>
                     </span>
                 </td>
                 <td>
                    
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <button onClick={decreaseQuantity}>-</button>
                          <input //The input for quantity.
                            type="number"
                            value={quantity} //Input value bound to components quantity.
                            onChange={(e) => setQuantity(Number(e.target.value) || 0)} //Update quantity state if quantity is changed.
                            style={{ textAlign: 'center', width: '30px', margin: '0 5px' }}
                            min="1" //Set the minimun number to 1.
                            />
                        <button onClick={increaseQuantity}>+</button>
                        </div>
                        
                    <td>
                    {" " + item.rebatePercent + "% discount for " + item.rebateQuantity + "pcs, "} {/*Button to remove the item.*/}
                    </td>
                 </td>
                 <td>
                    <td>
                            {" " + subTotal.toFixed(2)} {/*Display the subtotal.*/}
                    </td>
                    <tr className="discount">
                        {"( " + totalDiscount.toFixed(2) + ")"}  {/*Display the subtotal.*/}
                    </tr>
                  </td>
                 <td>
                      <span><Button onClick={() => onRemove(item.id)}>🗑️</Button></span> {/*Button to remove the item.*/}
                 </td>
         </tr>

    )
}

export default ItemComponent; //Export the component.
