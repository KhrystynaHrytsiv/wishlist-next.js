'use client'

import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {IWish} from "@/app/interface/IWish";

interface IContext {
    wishes: IWish[],
    setWishes: Dispatch<SetStateAction<IWish[]>>;
    trigger: boolean,
    setTrigger: Dispatch<SetStateAction<boolean>>;
    wishForUpdate: IWish | null,
    setWishForUpdate: Dispatch<SetStateAction<IWish | null>>

}
const Context = createContext<IContext | null>(null);

export default function ContextProvider ({children}:{children: React.ReactNode }){
        const [wishes, setWishes] = useState<IWish[]>([]);
        const [trigger, setTrigger] = useState(false);
        const [wishForUpdate, setWishForUpdate] = useState<IWish | null>(null);

        return (
        <Context.Provider value={{wishes, setWishes, trigger, setTrigger, wishForUpdate, setWishForUpdate}}>
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