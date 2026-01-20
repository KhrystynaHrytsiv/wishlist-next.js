'use client'
import React from 'react';
import Wishes from "@/app/(main-layout)/wishes/components/Wishes";
import WishForm from "@/app/(main-layout)/wishes/components/WishForm";
import {IoMdCloseCircleOutline} from "react-icons/io";
import Modal from "@/app/(main-layout)/wishes/components/Modal";
import {useAppContext} from "@/app/Context";

const WishesPage =  () => {
    const {isOpen, setIsOpen} = useAppContext();

    return (

        <div>
            <button
                onClick={() => setIsOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded">Add New Wish
            </button>
            {isOpen && (
                <Modal>
                    <IoMdCloseCircleOutline className= 'w-10 h-10' onClick ={()=>setIsOpen(prev => !prev)} />
                    <WishForm/>
                </Modal>
            )}
            <Wishes/>
        </div>
    );
};

export default WishesPage;