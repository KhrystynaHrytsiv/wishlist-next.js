import React from 'react';
import {IWish} from "@/app/interface/IWish";
import Link from "next/link";
import wishService from "@/app/service/wishService";
import {useAppContext} from "@/app/Context";

const WishDetails = ({wish}:{wish:IWish}) => {
    const {id, title, description, image, price, link } = wish;
    const {setTrigger, setWishForUpdate} = useAppContext();

    const remove = async () =>{
        await wishService.delete(id);
        setTrigger((prev:boolean) =>!prev);
    }
    return (
        <div>
            <div>
                 <img src={image} alt={title}/>
                 <h1>{title}</h1>
                 <p> {description}</p>
                 <h3>{price}$</h3>
                 <Link href={link}>Go for buying</Link>
            <div>
                <button onClick={()=>setWishForUpdate(wish)} >Update</button>
                <button onClick={remove}>Delete</button>
            </div>
            </div>
        </div>
    );
};

export default WishDetails;