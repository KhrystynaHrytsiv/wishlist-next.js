'use client'
import React from 'react';
import {IWish} from "@/app/interface/IWish";
import Link from "next/link";
import wishService from "@/app/service/wishService";
import {useAppContext} from "@/app/Context";
import {AiOutlineArrowLeft} from "react-icons/ai";
import {useRouter} from "next/navigation";
import Modal from "@/app/(main-layout)/wishes/components/Modal";
import {IoMdCloseCircleOutline} from "react-icons/io";
import WishForm from "@/app/(main-layout)/wishes/components/WishForm";

const WishDetails = ({wish}:{wish:IWish}) => {
    const {id, title, description, image, price, link } = wish;
    const {setTrigger, setWishForUpdate, isOpen, setIsOpen} = useAppContext();
    const navigate = useRouter();

    const remove = async () =>{
        await wishService.delete(id);
        setTrigger((prev:boolean) =>!prev);
    }
    const update = ()=> setWishForUpdate(wish);
    return (
        <>
        <div onClick={()=>navigate.back()} className='text-3xl h-10 w-10 bg-gray-400 rounded-3xl content-center m-2 justify-center cursor-pointer' ><AiOutlineArrowLeft/></div>
        <div className='w-1/2 border-1 flex justify-center m-auto gap-6'>
            <div>
                 <img src={image} alt={title} className='h-100 '/>
                 <h1>Title: {title}</h1>
                 <p>Description: {description}</p>
                 <h3>Price: {price}$</h3>
                {link && <Link href={link} >Go for buying</Link>}
            <div className='flex justify-around m-2'>
                    <button onClick={update} className='border-1 w-40 bg-blue-400' >Update</button>
                {isOpen && (
                    <Modal>
                        <IoMdCloseCircleOutline className= 'w-10 h-10' onClick ={()=>setIsOpen(prev => !prev)} />
                        <WishForm/>
                    </Modal>
                )}
                <button onClick={remove} className='border-1 w-40 bg-red-400'>Delete</button>
            </div>
            </div>
        </div>
        </>
    );
};

export default WishDetails;