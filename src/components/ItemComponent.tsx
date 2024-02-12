import React from 'react';
import { Item } from 'src/types/Items'

interface ItemProps{
    item: Item;
    onRemove: (id: String) => void;
}

const ItemComponent: React.FC<ItemProps> = ({ item, onRemove }) => {
    return(
        <div className="item">
            <span>
                {item.name}
            </span>
            <span>
                {'$${item.price.toFixed(2)}'}
            </span>
            <button onClick={()=> onRemove(item.id)}>X</button>
        </div>
    )
}

export default ItemComponent;