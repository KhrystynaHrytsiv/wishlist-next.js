'use client'
import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {IWish} from "@/app/interface/IWish";
import {useAppContext} from "@/app/Context";
import wishService from "@/app/service/wishService";

const WishForm = () => {
// const {register, handleSubmit, setValue, reset, formState:{isValid, errors} } = useForm<IWishForm>({mode: 'all', resolver: yupResolver(WishValidator)});
const {register, handleSubmit, setValue, reset, formState:{isValid, errors} } = useForm<IWish>({mode: 'all'});
const {wishForUpdate, setWishForUpdate, setTrigger} = useAppContext();

    useEffect(() => {
        if(wishForUpdate){
            setValue('title', wishForUpdate.title, {shouldValidate:true});
            setValue('description', wishForUpdate.description, {shouldValidate:true});
            setValue('price', wishForUpdate.price, {shouldValidate:true});
            setValue('image', wishForUpdate.image, {shouldValidate:true});
            setValue('link', wishForUpdate.link, {shouldValidate:true});
        }
    }, [wishForUpdate, setValue]);

    const save:SubmitHandler<IWish> = async (wish:IWish) =>{
        await wishService.create(wish);
        setTrigger(prev =>!prev);
        reset();
    }

    const update:SubmitHandler<IWish> = async (wish:IWish) =>{
        if(wishForUpdate){
        await wishService.update(wishForUpdate.id, wish);
        setTrigger(prev => !prev);
        setWishForUpdate(null);
        reset();
        }
    }
    return (
        <form onSubmit={handleSubmit(wishForUpdate ? update: save)} className=' w-1/2 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md gap-4'>
            <input type={"text"} placeholder={'Title'} {...register('title')} className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
            <input type={"text"} placeholder={'Description'} {...register('description')} className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
            <input type={"number"} placeholder={'Price'} {...register('price')} className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
            <input type={"url"} placeholder={'Image'} {...register('image')} className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
            <input type={"url"} placeholder={'Link'} {...register('link')} className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
            <button disabled={!isValid} className={`mt-4 px-4 py-2 rounded-md text-white font-semibold transition ${isValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}>{wishForUpdate ? 'Update':'Save'}</button>
            {errors.title && <div>{errors.title.message}</div>}
            {errors.description && <div>{errors.description.message}</div>}
            {errors.price && <div>{errors.price.message}</div>}
            {errors.image && <div>{errors.image.message}</div>}
            {errors.link && <div>{errors.link.message}</div>}
        </form>
    );
};

export default WishForm;