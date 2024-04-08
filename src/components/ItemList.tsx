import React, { useState, useEffect } from 'react';
import ItemComponent from "./ItemComponent";
import { Item } from '../types/Items';
import { Table } from 'react-bootstrap';

const ItemList: React.FC = () => {
    //Hook for the list of items.
    const [items, setItems] = useState<Item[]>([]);
    //Hook for tracking the subtotal for each item based on its quantity.
    const [subtotals, setSubtotals] = useState<{ [key: string]: number }>({});
    //Function to find a substitute for an item. 

    //Loading 
    const [loading, setLoading] = useState<boolean>(true);

   
    const findSubstitute = (currentItem: Item):Item|null => {
    //Filters the items to find the ones with the same type and a higher price.
        const substitutes = items.filter(item => 
            item.type === currentItem.type && item.price > currentItem.price
        );
        //Sorts the substitutes by price and returns the first one.
        substitutes.sort((a, b) => a.price - b.price);
       
        return substitutes[0];
    };
    const handleSubstitute = (currentItemId: string) => {
        const newItemList = items.map(item => {
            if (item.id === currentItemId) {
                const substituteItem = findSubstitute(item);
                return substituteItem ? { ...substituteItem, amount: item.amount } : item; // Giữ nguyên số lượng nhưng cập nhật thông tin mặt hàng nếu tìm thấy thay thế
            }
            return item;
        });
        setItems(newItemList);
    };

    //This calculates the initial subtotal for each item.
    useEffect(() => {
        const initialSubtotals = items.reduce((acc, item) => {
            acc[item.id] = item.price;
            return acc;
        }, {} as { [key: string]: number });
        setSubtotals(initialSubtotals);

        const fetchData = async () => {
            try {
              const response = await fetch('https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json');
              if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
              const data: Item[] = await response.json();
              setItems(data);
              setLoading(false);
            } catch (error) {
              console.error('Error fetching data:', error);
              setLoading(false);
            }
          };

          fetchData();

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
    let discount = 0;
    if (total > 300) {
        discount = total;
        total = total * 0.90;
        discount = discount - total;
    }



    //Maps each item to an itemComponent and display the total price.
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th></th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <ItemComponent key={item.id} 
                        item={item} onRemove={removeItem} 
                        onQuantityChange={handleQuantityChange}
                        onFindSubstitute={() => handleSubstitute(item.id)}/>
                        
                    ))}

                </tbody>
            </Table>
            <div>Total: ${total.toFixed(2)}</div>
            <div>Total discount: ${discount.toFixed(2)}</div>


        </>

        
    )
}


export default ItemList;