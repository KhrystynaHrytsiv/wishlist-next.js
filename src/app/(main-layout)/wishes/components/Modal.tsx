'use client'
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const Modal = ({ children}: Props) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60"/>
            <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                {children}
            </div>
        </div>
    );
};

export default Modal;