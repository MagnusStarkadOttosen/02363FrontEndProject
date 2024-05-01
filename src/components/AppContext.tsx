import React, { createContext, useState } from 'react';
import { Item } from '../types/Items';

interface AppContextType {
    totalAmount: number;
    totalQuantity: number;
    setTotalQuantity:(quantity:number)=>void;
    listItem: Item[];
    setListItems: (items: Item[]) => void;
    paymentMethod: string;
    setPaymentMethod: (paymentMethod: string) => void;
  
  }
 

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [totalAmount, setTotalAmounts] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [listItem, setListItems] = useState<Item[]>([]);
    const [paymentMethod, setPaymentMethodState] = useState('');

    const setPaymentMethod = (paymentMethod: string) => {
        setPaymentMethodState(paymentMethod);
    }
    const setListItem = (items: Item[]) => {
        setListItems(items);
        const t = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        let discount = items.reduce((acc, item) =>{
            let a = 0;
            if (item.quantity >= item.rebateQuantity) {
                a = (item.price * item.rebatePercent * item.quantity) / 100;
            }
            return acc + a;
        },0);
        if ((t-discount) > 300) {
            discount += (t - discount) * 0.10;
        }
        setTotalAmounts(t-discount);
           
    }

    const value = {
        totalAmount,
        totalQuantity,
        setTotalQuantity,
        listItem,
        setListItems: setListItem,
        paymentMethod,
        setPaymentMethod,
    };

    return (
        <AppContext.Provider value={value }>
            {children}
        </AppContext.Provider>
    );
};
export default {AppContext, AppProvider};



