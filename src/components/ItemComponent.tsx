import React from 'react';
import { Item } from '../types/Items';

interface ItemProps{
    item: Item;
    onRemove: (id: String) => void;
}

const ItemComponent: React.FC<ItemProps> = ({ item, onRemove }) => {
    return(
        <div className="item">
            <button onClick={()=> onRemove(item.id)}>X</button>
            <span>
                {item.name}
            </span>
            <span>
                {"Price: $" + item.price.toFixed(2)}
            </span>
        </div>
    )
}

export default ItemComponent;