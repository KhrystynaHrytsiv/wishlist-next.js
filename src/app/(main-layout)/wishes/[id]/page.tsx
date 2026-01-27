import React from 'react';
import WishDetails from "@/app/(main-layout)/wishes/[id]/WishDetails";
import wishService from "@/app/service/wishService";


interface IProp {
    params: {id:string}
}
const Page = async ({ params }:IProp) => {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const { data } = await wishService.getById(id);

    return (
        <div>
            <WishDetails wish={data}/>
        </div>
    );
};

export default Page;
