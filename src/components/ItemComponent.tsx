import React, { useState , useEffect } from 'react';
import { Item } from '../types/Items';

interface ItemProps{
    item: Item;
    onRemove: (id: string) => void;
    onQuantityChange: (id: string, subtotal: number) => void;
}

const ItemComponent: React.FC<ItemProps> = ({ item, onRemove, onQuantityChange }) => {

    const [quantity, setQuantity] = useState(1);
    const subTotal = item.price * quantity;

    useEffect(() => {
        onQuantityChange(item.id, subTotal);
    }, [quantity]);

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