'use client'
import {useRouter} from "next/navigation";
import {useAppContext} from "@/app/Context";
import {useEffect} from "react";
import wishService from "@/app/service/wishService";


const Wishes = () => {
    const {setWishes, trigger, sortedWishes} = useAppContext();
    const navigation = useRouter();

    useEffect(() => {
        wishService.getAll().then(({data})=>setWishes(data))
    }, [trigger]);

    const goToDetails =(id: number)=>{
        navigation.push(`/wishes/${id}`)
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  p-4 gap-6'>
            {sortedWishes.map(wish =>
                <div key={wish.id} onClick={()=>goToDetails(wish.id)} className=" h-80 cursor-pointer bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
                {wish.image && <img src={wish.image} alt={wish.title} className='w-100 h-50 object-cover'/>}
                <h2 className='font-bold gap-4 my-2 text-lg'>{wish.title}</h2>
                <p className='text-base'> {wish.description}</p>
                <p>{wish.price}$</p>
            </div>)}
        </div>
    );
};

export default Wishes;