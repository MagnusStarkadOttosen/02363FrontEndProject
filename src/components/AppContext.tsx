import React, { createContext, useState } from 'react';
import { Item } from '../types/Items';

interface AppContextType {
    totalAmount: number;
    setTotalAmount: (amount: number) => void;
    totalQuantity: number;
    setTotalQuantity:(quantity:number)=>void;
    listItem: Item[];
    setListItems: (items: Item[]) => void;
    paymentMethod: string;
    setPaymentMethod: (paymentMethod: string) => void;
  
  }
 

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [listItem, setListItem] = useState<Item[]>([]);

    const value = {
        totalAmount,
        setTotalAmount,
        totalQuantity,
        setTotalQuantity,
        listItem,
        setListItems: setListItem,
        paymentMethod: '',
        setPaymentMethod: () => {},
    };

    return (
        <AppContext.Provider value={value }>
            {children}
        </AppContext.Provider>
    );
};

// export default {AppContext, AppProvider};
