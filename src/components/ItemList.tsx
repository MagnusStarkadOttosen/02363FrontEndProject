import React, { useState} from 'react';
import ItemComponent from "./ItemComponent";
import {Item} from '../types/Item.ts';

const initItems: Item[] = [
    { id: "item1", name: "name1", price: 150},
    { id: "item2", name: "name2", price: 120},
    { id: "item3", name: "name3", price: 110},
    { id: "item4", name: "name4", price: 100},
]

const ItemList: React.FC = () => {
    const[items, setItems] = useState<Item[]>(initItems);

    const removeItem = (id: String) =>{
        setItems(items.filter(item=>item.id!==id));
    }

    return(
        <div>
            {items.map(item=>(
                <ItemComponent key={item.id} item={item} onRemove={removeItem} />
            ))}
        </div>
    )
}

export default ItemList;