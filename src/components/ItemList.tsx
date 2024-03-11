import React, { useState, useEffect} from 'react';
import ItemComponent from "./ItemComponent";
import { Item } from '../types/Items';
import Table from 'react-bootstrap/Table';
import image1 from '/Users/lynguyenhansen/JavaScript/02363FrontEndProject/src/assets/images/d3-vitamin.jpeg';
import image2 from '/Users/lynguyenhansen/JavaScript/02363FrontEndProject/src/assets/images/c-vitamin-500.jpeg';
import image3 from '/Users/lynguyenhansen/JavaScript/02363FrontEndProject/src/assets/images/c-vitamin-depot.jpeg';
import image4 from '/Users/lynguyenhansen/JavaScript/02363FrontEndProject/src/assets/images/omega.jpeg';


/**
 * This is the hardcoded list of initial items.
 */
const initItems: Item[] = [
    { id: "vitamin-d-90-100", name: "D-vitamin, 90ug, 100 stk", type:"D-vitamin", imageSrc:image1, price: 116, amount: 0, rebateQuantity: 3, rebatePercent: 10, gift: 0},
    { id: "vitamin-c-500-250", name: "C-vitamin, 500mg, 240 stk", type:"C-vitamin",imageSrc:image2, amount: 0, rebateQuantity: 3, rebatePercent: 10, price: 175, gift: 0},
    { id: "vitamin-c-depot-500-250", name: "C-vitamin Depot, 500mg, 240 stk",type:"C-vitamin",imageSrc:image3, amount: 0, rebateQuantity: 3, rebatePercent: 10, price: 175, gift: 0},
    { id: "fish-oil-1000-120", name: "Omega 3 fiskeolie, 1000mg, 120 stk", type:"Omega",imageSrc:image4, amount: 0, rebateQuantity: 3, rebatePercent: 10, price: 175, gift: 0}
];

const ItemList: React.FC = () => {
    //Hook for the list of items.
    const[items, setItems] = useState<Item[]>(initItems);
    //Hook for tracking the subtotal for each item based on its quantity.
    const [subtotals, setSubtotals] = useState<{ [key: string]: number }>({});

    //This calculates the initial subtotal for each item.
    useEffect(() => {
        const initialSubtotals = initItems.reduce((acc, item) => {
            acc[item.id] = item.price;
            return acc;
        }, {} as { [key: string]: number });
        setSubtotals(initialSubtotals);
    }, []);

    //Function to removes an item.
    const removeItem = (id: string) =>{
        setItems(items.filter(item=>item.id!==id));
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
    let discount = 0;
    if(total > 300){
        discount = total;
        total = total * 0.90;
        discount = discount - total;
    }

    //Maps each item to an itemComponent and display the total price.
    return(
        <Table striped bordered hover>
        <thead>
            <title>Indkøbskurv </title>
            <tr>
                <th>Product</th>
                <th></th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        
            {items.map(item=>(
                <ItemComponent key={item.id} item={item} onRemove={removeItem} onQuantityChange={handleQuantityChange} />
            ))}
            <div>Total: ${total.toFixed(2)}</div>
            <div>Total discount: ${discount.toFixed(2)}</div>
        </tbody>
        </Table>
    )
}

export default ItemList;