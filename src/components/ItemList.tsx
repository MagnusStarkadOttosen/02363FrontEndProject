import React, { useState, useEffect} from 'react';
import ItemComponent from "./ItemComponent";
import { Item } from '../types/Items';

/**
 * This is the hardcoded list of initial items.
 */
const initItems: Item[] = [
    { id: "item1", name: "name1", price: 150},
    { id: "item2", name: "name2", price: 120},
    { id: "item3", name: "name3", price: 110},
    { id: "item4", name: "name4", price: 100},
]

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
    const total = Object.values(subtotals).reduce((acc, curr) => acc + curr, 0);

    //Maps each item to an itemComponent and display the total price.
    return(
        <div>
            {items.map(item=>(
                <ItemComponent key={item.id} item={item} onRemove={removeItem} onQuantityChange={handleQuantityChange} />
            ))}
            <div>Total: ${total.toFixed(2)}</div>
        </div>
    )
}

export default ItemList;