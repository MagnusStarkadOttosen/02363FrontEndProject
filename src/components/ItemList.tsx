import React, { useState, useEffect} from 'react';
import ItemComponent from "./ItemComponent";
import { Item } from '../types/Items';

const initItems: Item[] = [
    { id: "item1", name: "name1", price: 150},
    { id: "item2", name: "name2", price: 120},
    { id: "item3", name: "name3", price: 110},
    { id: "item4", name: "name4", price: 100},
]

const ItemList: React.FC = () => {
    const[items, setItems] = useState<Item[]>(initItems);
    const [subtotals, setSubtotals] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const initialSubtotals = initItems.reduce((acc, item) => {
            acc[item.id] = item.price;
            return acc;
        }, {} as { [key: string]: number });
        setSubtotals(initialSubtotals);
    }, []);

    const removeItem = (id: string) =>{
        setItems(items.filter(item=>item.id!==id));
        const newSubtotals = { ...subtotals };
        delete newSubtotals[id];
        setSubtotals(newSubtotals);
    }

    const handleQuantityChange = (id: string, subtotal: number) => {
        setSubtotals({ ...subtotals, [id]: subtotal });
    };

    const total = Object.values(subtotals).reduce((acc, curr) => acc + curr, 0);

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