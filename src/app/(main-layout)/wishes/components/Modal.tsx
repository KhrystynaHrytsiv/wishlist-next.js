'use client'
import WishForm from "@/app/(main-layout)/wishes/components/WishForm";
import React from "react";


const Modal = () => {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60"/>
            <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                <WishForm/>
            </div>
        </div>
    );
};

export default Modal;