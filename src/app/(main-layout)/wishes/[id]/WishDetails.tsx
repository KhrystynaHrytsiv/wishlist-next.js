'use client'
import React, {useState} from 'react';
import {IWish} from "@/app/interface/IWish";
import Link from "next/link";
import wishService from "@/app/service/wishService";
import {useAppContext} from "@/app/Context";
import {AiOutlineArrowLeft} from "react-icons/ai";
import {useRouter} from "next/navigation";
import Modal from "@/app/(main-layout)/wishes/components/Modal";

const WishDetails = ({wish}:{wish:IWish}) => {
    const {id, title, description, image, price, link } = wish;
    const {setTrigger, setWishForUpdate, isOpen, setIsOpen} = useAppContext();
    const navigate = useRouter();
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const remove = async () =>{
        await wishService.delete(id);
        setTrigger((prev:boolean) =>!prev);
        setIsDeleteOpen(true);
    }
    const update = ()=> {
        setWishForUpdate(wish);
        setIsOpen(true);
    }
    return (
        <>
        <div onClick={()=>navigate.back()} className='flex items-center justify-center text-3xl h-10 w-10 bg-gray-400 rounded-full m-2 cursor-pointer' ><AiOutlineArrowLeft/></div>
        <div className=' w-123 flex justify-center m-auto gap-5 rounded-2xl bg-pink-200 flex-col'>
                 <img src={image} alt={title} className='h-110 w-123 object-cover rounded-2xl'/>
            <div className= 'mx-4 text-lg '>
                 <h1 className='font-bold text-xl'>Title: {title}</h1>
                 <p>Description: {description}</p>
                 <h3>Price: {price}$</h3>
                {link && <Link href={link} >Link for buying</Link>}
            <div className='flex justify-around m-2'>
                    <button onClick={update} className='w-40 h-12 bg-blue-400 rounded-xl cursor-pointer' >Update</button>
                {isOpen && <Modal/>}
                <button className=' w-40 bg-red-400 rounded-xl cursor-pointer' onClick={()=>setIsDeleteOpen(true)}>Delete</button>
                {isDeleteOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/60" onClick={() => setIsDeleteOpen(false)}/>
                        <div className="relative z-10 bg-rose-200 w-100 h-60 flex flex-col rounded-xl py-8">
                            <h3 className="text-lg font-semibold text-center mt-8">Are you really want to delete this wish?</h3>
                            <div className="flex justify-center gap-4 mt-auto py-3">
                                <button onClick={remove} className="px-4 py-2 rounded bg-red-500 text-white">Confirm
                                </button>
                                <button onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 rounded bg-gray-300">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            </div>
        </div>
        </>
    );
};

export default WishDetails;