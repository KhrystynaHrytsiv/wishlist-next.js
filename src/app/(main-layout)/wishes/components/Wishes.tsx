'use client'
import {useRouter} from "next/navigation";
import {useAppContext} from "@/app/Context";
import {useEffect} from "react";
import wishService from "@/app/service/wishService";


const Wishes = () => {
    const {wishes, setWishes} = useAppContext();
    const navigation = useRouter();

    useEffect(() => {
        wishService.getAll().then(({data})=>setWishes(data))
    }, []);

    const goToDetails =(id: number)=>{
        navigation.push(`/wishes/${id}`)
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  p-4 gap-6'>
            {wishes.map(wish =>
                <div key={wish.id} onClick={()=>goToDetails(wish.id)} className="cursor-pointer bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
                {wish.image && <img src={wish.image} alt={wish.title} className='w-2/3 h-2/3'  />}
                <h2>{wish.title}</h2>
                <p> {wish.description}</p>
            </div>)}
        </div>
    );
};

export default Wishes;