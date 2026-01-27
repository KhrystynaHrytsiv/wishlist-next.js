'use client'
import {useRouter, useSearchParams} from "next/navigation";
import {useAppContext} from "@/app/Context";
import React, {useEffect} from "react";
import wishService from "@/app/service/wishService";

const ITEMS_PER_PAGE = 8;
const Wishes = () => {
    const {setWishes, trigger, sortedWishes} = useAppContext();
    const navigation = useRouter();
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page') ?? 1);

    useEffect(() => {
        wishService.getAll().then(({data})=>setWishes(data))
    }, [trigger]);

    const totalPages = Math.ceil(sortedWishes.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedWishes = sortedWishes.slice(startIndex, endIndex);

    const prev = () => {
        if (page > 1) {
            navigation.push(`?page=${page - 1}`);
        }
    };

    const next = () => {
        if (page < totalPages) {
            navigation.push(`?page=${page + 1}`);
        }
    };


    const goToDetails =(id: string)=>{
        navigation.push(`/wishes/${id}`)
    }

    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  p-4 gap-6'>
                {paginatedWishes.map(wish =>
                    <div key={wish.id} onClick={() => goToDetails(wish.id)}
                         className=" h-80 cursor-pointer bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
                        {wish.image && <img src={wish.image} alt={wish.title} className='w-100 h-50 object-cover'/>}
                        <h2 className='font-bold gap-4 my-2 text-lg'>{wish.title}</h2>
                        <p className='text-base line-clamp-1'> {wish.description}</p>
                        <p>{wish.price}$</p>
                    </div>)}
            </div>
            <div className="flex justify-center gap-4 pb-6">
                <button onClick={prev} disabled={page === 1} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Prev</button>
                <span className="flex items-center">{page} / {totalPages}</span>
                <button onClick={next} disabled={page === totalPages} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Next</button>
            </div>
        </>
    );
};

export default Wishes;