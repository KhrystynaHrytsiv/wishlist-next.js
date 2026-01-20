import React, {FC} from 'react';
import wishService from "@/app/service/wishService";
import WishDetails from "@/app/(main-layout)/wishes/[id]/WishDetails";


interface IProp {
   params: {id:string}
}
const Page:FC<IProp> = async ({params}) => {
    const resolveParams = await params;
    const {id} = resolveParams;
    const {data} = await wishService.getById(id);
    console.log(data);
    return (
        <div>
            <WishDetails wish={data}/>
        </div>
    );
};

export default Page;