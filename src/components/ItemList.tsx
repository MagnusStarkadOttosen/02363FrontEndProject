import React, { useState, useEffect } from 'react';
import ItemComponent from "./ItemComponent";
import { Item } from '../types/Items';
import { Table } from 'react-bootstrap';
import image1 from '../assets/images/d3-vitamin.jpeg';
import image2 from '../assets/images/c-vitamin-500.jpeg';
import image3 from '../assets/images/c-vitamin-depot.jpeg';
import image4 from '../assets/images/omega.jpeg';
import { i } from 'vitest/dist/reporters-MmQN-57K.js';


/**
 * This is the hardcoded list of initial items.
 */
const initItems: Item[] = [
    { id: "vitamin-d-90-100", name: "D-vitamin, 90ug, 100 stk", type: "D-vitamin",offer:"",substituteItem:null, imageSrc: image1, price: 116, amount: 0, rebateQuantity: 3, rebatePercent: 10, gift: false },
    { id: "vitamin-c-500-250", name: "C-vitamin, 500mg, 240 stk", type: "C-vitamin",offer:"",substituteItem:null, imageSrc: image2, amount: 0, rebateQuantity: 3, rebatePercent: 10, price: 150, gift: false },
    { id: "vitamin-c-depot-500-250", name: "C-vitamin Depot, 500mg, 240 stk", type: "C-vitamin",offer:"",substituteItem:null, imageSrc: image3, amount: 0, rebateQuantity: 3, rebatePercent: 10, price: 175, gift: false },
    { id: "fish-oil-1000-120", name: "Omega 3 fiskeolie, 1000mg, 120 stk", type: "Omega",offer:"",substituteItem:null, imageSrc: image4, amount: 0, rebateQuantity: 3, rebatePercent: 10, price: 69, gift: false },
];

const ItemList: React.FC = () => {
    //Hook for the list of items.
    const [items, setItems] = useState<Item[]>(initItems);
    //Hook for tracking the subtotal for each item based on its quantity.
    const [subtotals, setSubtotals] = useState<{ [key: string]: number }>({});
    //Function to find a substitute for an item. 
   
    const findSubstitute = (currentItem: Item):Item|undefined => {
    //Filters the items to find the ones with the same type and a higher price.
        let substitutes = items.filter(item => 
            item.type === currentItem.type && item.price > currentItem.price
        );
        //Sorts the substitutes by price and returns the first one.
        substitutes.sort((a, b) => a.price - b.price);
       
        return substitutes[0];
    };
    //Function to handle the substitute button.
    const handleSubstitute = (currentItemId: string) => {
        const currentItem = items.find(item => item.id === currentItemId); //Finds the current item.
        const newItem = currentItem ? findSubstitute(currentItem) : undefined; //Finds the substitute.
        if (currentItem && newItem) {
         currentItem.substituteItem = newItem;
         handleItemList(currentItemId);
        }

    };
    // function to check if there are two items with the same name and price, it will keep one and increase the quantity 
    const handleItemList =(currentItemId: string)=>{
      let updatedItems=[...items];
      const currentItemIndex = updatedItems.findIndex(item=>item.id===currentItemId);
      if(currentItemIndex>-1){
        const currentItem=updatedItems[currentItemIndex];
        const newItemIndex = updatedItems.findIndex(item=>item.id===currentItem.substituteItem?.id&& item.price===currentItem.substituteItem?.price);
        if(newItemIndex>-1){
          updatedItems[newItemIndex].amount =updatedItems[currentItemIndex].amount+1;
          updatedItems.splice(newItemIndex,1);
        }
    }
     setItems(updatedItems);
    
    }

    items.forEach(item => {handleSubstitute(item.id)});

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
        setItems(items.filter(item => item.id !== id));
        const newSubtotals = { ...subtotals };
        delete newSubtotals[id];
        setSubtotals(newSubtotals);
    }

    //Function to handle changes in an items quantity.
    //This also updates the subtotal for the specified item.
    const handleQuantityChange = (id: string, subtotal: number) => {
        setSubtotals({ ...subtotals, [id]: subtotal });
    };

    //The total price for all items
    let total = Object.values(subtotals).reduce((acc, curr) => acc + curr, 0);
    console.log(total);
    let discount = 0;
    let totalefterdiscount = 0;
    if (total > 300) {
        discount = total;
        totalefterdiscount = total * 0.90;
        discount = discount - totalefterdiscount;
    } 
    console.log(total);


    //Maps each item to an itemComponent and display the total price.
    return (
        <> 
        <h2>List Of Products</h2>
        <tbody>
        <tr>
            <td>
            <div className='product_area'>
            <Table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th ></th>
                        <th></th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th ></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <ItemComponent
                            key={item.id}
                            item={item}
                            onRemove={removeItem}
                            onQuantityChange={handleQuantityChange}
                            onFindSubstitute={() => handleSubstitute(item.id)}
                            handleSubstitute={() => handleSubstitute(item.id)} // Add the missing handleSubstitute property
                        />
                    ))}
                </tbody>
            </Table>
            </div>
            </td>
            <td>
            <div className='totalprice'>
                <h2> Total price </h2>
                <table>
                <tbody>
                <tr>
                 <td className='a'> {items.length} products: </td>
                 <td className='b'> ${total.toFixed(2)} </td>
                 </tr>
                 <tr>
                <td className='a' >Total discount:</td>
                <td className='b'> ${discount.toFixed(2)}</td>
                </tr>
                <tr>
                 <td className='a'>Total: </td>
                 <td className='b'> ${totalefterdiscount.toFixed(2)}</td>
                 </tr>
                 </tbody>
                 </table>
            </div>
            </td>
            </tr>
            </tbody>
        </>
    )
}


export default ItemList;