//import React from 'react';
import React, { useState } from 'react';
import { Item } from '../types/Items';

interface ItemProps{
    item: Item;
    onRemove: (id: String) => void;
}

const ItemComponent: React.FC<ItemProps> = ({ item, onRemove }) => {

    const [quantity, setQuantity] = useState(1);
    const subTotal = item.price * quantity;

    return(
        <div className="item">
            <button onClick={()=> onRemove(item.id)}>X</button>
            <span>
                {item.name}
            </span>
            <span>
                {"Price: $" + item.price.toFixed(2)}
            </span>
            <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))} 
                min="1"
            />
            <span>
                {"Subtotal: $" + subTotal.toFixed(2)}
            </span>
        </div>
    )
}

export default ItemComponent;