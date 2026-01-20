import React, {FC} from 'react';
import wishService from "@/app/service/wishService";
import WishDetails from "@/app/(main-layout)/wishes/[id]/WishDetails";


interface IProp {
   params: {id:string}
}
const Page:FC<IProp> = async ({params: {id}}) => {
    console.log('ID:', id);
    const {data} = await wishService.getById(id);
    return (
        <div>
            <WishDetails wish={data}/>
        </div>
    );
};

export default Page;