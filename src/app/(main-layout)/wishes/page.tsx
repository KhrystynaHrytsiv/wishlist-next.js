'use client'
import React from 'react';
import Wishes from "@/app/(main-layout)/wishes/components/Wishes";
import Modal from "@/app/(main-layout)/wishes/components/Modal";
import {useAppContext} from "@/app/Context";
import Filters from "@/app/(main-layout)/wishes/components/Filters";

const WishesPage =  () => {
    const {isOpen, setIsOpen} = useAppContext();

    return (
        <div>
            <div className='flex justify-between px-6 py-2  flex-col md:flex-row gap-2 md:items-center'>
            <Filters/>
            <button onClick={() => setIsOpen(true)} className=" w-50 px-4 py-2 bg-blue-500 text-white rounded text-sm sm:text-base md:text-lg lg:text-xl ">
                Add New Wish
            </button>
            </div>
            {isOpen && <Modal/>}
            <Wishes/>
        </div>
    );
};

export default WishesPage;