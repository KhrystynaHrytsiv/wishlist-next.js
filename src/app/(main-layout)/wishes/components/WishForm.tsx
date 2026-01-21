'use client'
import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {IWish} from "@/app/interface/IWish";
import {useAppContext} from "@/app/Context";
import wishService from "@/app/service/wishService";
import {IoMdCloseCircleOutline} from "react-icons/io";
import {yupResolver} from "@hookform/resolvers/yup";
import WishValidator from "@/app/validator/validator";
import {IWishForm} from "@/app/interface/IWishForm";

const WishForm = () => {
const {register, handleSubmit, setValue, reset, formState:{isValid, errors} } = useForm<IWishForm>({mode:'all', resolver: yupResolver(WishValidator)});
const {wishForUpdate, setWishForUpdate, setTrigger, setIsOpen} = useAppContext();

    useEffect(() => {
        if(wishForUpdate){
            setValue('title', wishForUpdate.title, {shouldValidate:true});
            setValue('description', wishForUpdate.description, {shouldValidate:true});
            setValue('price', wishForUpdate.price, {shouldValidate:true});
            setValue('image', wishForUpdate.image, {shouldValidate:true});
            setValue('link', wishForUpdate.link, {shouldValidate:true});
        }
    }, [wishForUpdate, setValue]);

    const save:SubmitHandler<IWishForm> = async (wish:IWishForm) =>{
        const response = await wishService.getAll();  // AxiosResponse<IWish[]>
        const wishes = response.data;
        const newId = wishes.length > 0
            ? wishes[wishes.length - 1].id + 1 : 1;
        const newWish: IWish = {
            ...wish,
            id: newId,
            createdAt: new Date().toISOString(),
        };
        await wishService.create(newWish);
        setTrigger(prev =>!prev);
        reset();
    }

    const update:SubmitHandler<IWishForm> = async (wish:IWishForm) =>{
        if(wishForUpdate){
            const updateWish ={
                ...wishForUpdate,
                ...wish
            }
        await wishService.update(wishForUpdate.id, updateWish);
        setTrigger(prev => !prev);
        setWishForUpdate(null);
        reset();
        }
    }
    return (
        <form onSubmit={handleSubmit(wishForUpdate ? update: save)} className='flex flex-col m-auto p-6 bg-white rounded-lg shadow-md gap-2'>
            <IoMdCloseCircleOutline className= 'absolute top-3 right-3 w-10 h-10 cursor-pointer text-gray-600 hover:text-red-500' onClick ={()=>setIsOpen(prev => !prev)} />
            <input type={"text"} placeholder={'Title'} {...register('title')} className=' w-70 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 m-auto'/>
            {errors.title && <div>{errors.title.message}</div>}
            <input type={"text"} placeholder={'Description'} {...register('description')} className=' w-70 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 m-auto'/>
            <input type={"number"} placeholder={'Price'} {...register('price')} className=' w-70 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 m-auto'/>
            <input type={"url"} placeholder={'Image'} {...register('image')} className=' w-70 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 m-auto'/>
            <input type={"url"} placeholder={'Link'} {...register('link')} className='w-70 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 m-auto'/>
            <button disabled={!isValid} className={`w-50 m-auto mt-4 px-4 py-2 rounded-md text-white font-semibold transition ${isValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}>{wishForUpdate ? 'Update':'Save'}</button>
            {errors.description && <div>{errors.description.message}</div>}
            {errors.price && <div>{errors.price.message}</div>}
            {errors.image && <div>{errors.image.message}</div>}
            {errors.link && <div>{errors.link.message}</div>}
        </form>
    );
};

export default WishForm;