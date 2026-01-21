'use client'

import {createContext, Dispatch, SetStateAction, useContext, useMemo, useState} from "react";
import {IWish} from "@/app/interface/IWish";


interface IContext {
    wishes: IWish[],
    setWishes: Dispatch<SetStateAction<IWish[]>>;
    trigger: boolean,
    setTrigger: Dispatch<SetStateAction<boolean>>;
    wishForUpdate: IWish | null,
    setWishForUpdate: Dispatch<SetStateAction<IWish | null>>,
    isOpen:boolean,
    setIsOpen:Dispatch<SetStateAction<boolean>>;
    sortByDate: SortByData,
    setSortByDate: Dispatch<SetStateAction<SortByData>>,
    sortByPrice: SortByPrice,
    setSortByPrice: Dispatch<SetStateAction<SortByPrice>>,
    sortedWishes: IWish[]

}
const Context = createContext<IContext | null>(null);
export type SortByData = 'newest' | 'oldest'
export type SortByPrice = 'low' | 'high'
export default function ContextProvider ({children}:{children: React.ReactNode }){
    const [wishes, setWishes] = useState<IWish[]>([]);
    const [trigger, setTrigger] = useState(false);
    const [wishForUpdate, setWishForUpdate] = useState<IWish | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [sortByDate, setSortByDate] = useState<SortByData>('newest');
    const [sortByPrice, setSortByPrice] = useState<SortByPrice>("high")

    const sortedWishes = useMemo(()=> {
        return [...wishes]
            .sort((a, b) =>
                sortByDate === 'newest'
                    ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            )
            .sort((a, b) =>
                sortByPrice === 'high'
                    ? b.price - a.price
                    : a.price - b.price
            )
    }, [wishes, sortByDate, sortByPrice])

        return (
        <Context.Provider value={{wishes, setWishes, trigger, setTrigger, wishForUpdate, setWishForUpdate, isOpen, setIsOpen, sortedWishes, sortByDate, setSortByDate, sortByPrice, setSortByPrice}}>
            {children}
        </Context.Provider>
);
};

export const useAppContext = () => {
    const context = useContext(Context);

    if (!context) {
        throw new Error('useAppContext must be used within ContextProvider');
    }
    return context;
};