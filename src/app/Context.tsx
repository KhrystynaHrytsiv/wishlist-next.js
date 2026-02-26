'use client'

import {createContext, Dispatch, SetStateAction, useContext, useMemo, useState, ReactNode} from "react";
import {IWish} from "@/app/interface/IWish";
import {boolean} from "yup";


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
    sortedWishes: IWish[],
    status:SortByStatus,
    setStatus: Dispatch<SetStateAction<SortByStatus>>

}
const Context = createContext<IContext | null>(null);
export type SortByData = 'newest' | 'oldest' | null
export type SortByPrice = 'low' | 'high' | null
export type SortByStatus = 'free' | 'booked' | null
export default function ContextProvider ({children}:{children: ReactNode }){
    const [wishes, setWishes] = useState<IWish[]>([]);
    const [trigger, setTrigger] = useState(false);
    const [wishForUpdate, setWishForUpdate] = useState<IWish | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [sortByDate, setSortByDate] = useState<SortByData>(null);
    const [sortByPrice, setSortByPrice] = useState<SortByPrice>(null);
    const [status, setStatus] = useState<SortByStatus>(null);

    const sortedWishes = useMemo(() => {
        let result = [...wishes];
        if (sortByDate) {
            result.sort((a, b) =>
                sortByDate === 'newest'
                    ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
        }

        if (sortByPrice) {
            result.sort((a, b) =>
                sortByPrice === 'high'
                    ? b.price - a.price
                    : a.price - b.price
            );
        }
        if (status) {
            result.sort((a, b) =>
                status === 'free'
                    ? a.status === 'free' ? -1 : 1
                    : a.status === 'booked' ? -1 : 1
            );
        }

        return result;
    }, [wishes, sortByDate, sortByPrice, status]);

        return (
        <Context.Provider value={{wishes, setWishes, trigger, setTrigger, wishForUpdate, setWishForUpdate, isOpen, setIsOpen, sortedWishes, sortByDate, setSortByDate, sortByPrice, setSortByPrice, status, setStatus}}>
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