import React, { createContext, useState } from 'react';
import { Item } from '../types/Items';

interface AppContextType {
    totalAmount: number;
    setTotalAmount: (amount: number) => void;
    listItem: Item[];
    setListItems: (items: Item[]) => void;
    paymentMethod: string;
    setPaymentMethod: (paymentMethod: string) => void;
  
  }
 

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [listItems, setListItems] = useState<Item[]>([]);
    const [paymentMethod,setPaymentMethod]= useState('');

    const value = {
        totalAmount,
        setTotalAmount,
        listItem:listItems,
        setListItems,
        paymentMethod,
        setPaymentMethod,
    };

    return (
        <AppContext.Provider value={value }>
            {children}
        </AppContext.Provider>
    );
};

// export default {AppContext, AppProvider};
