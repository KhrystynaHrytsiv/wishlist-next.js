    import React from 'react';
    import {useAppContext} from "@/app/Context";

    const Filters = () => {
    const {sortByDate, sortByPrice, setSortByPrice, setSortByDate} = useAppContext();

        return (
            <div className='bg-black/30 flex gap-4 justify-around p-2 rounded  flex-col md:flex-row gap-2 md:items-center md:h-auto'>
                <div className='rounded bg-white gap-4 flex justify-center items-center lg:text-lg'>
                    <label> Sort by Date:</label>
                    <select value={sortByDate ?? ''} onChange={(e) =>
                            setSortByDate(e.target.value === '' ? null : (e.target.value as 'newest' | 'oldest'))}>
                        <option value="">No date sorting</option>
                        <option value="newest">Newest to oldest</option>
                        <option value="oldest">Oldest to newest</option>
                    </select>
                </div>
                <div className=' rounded bg-white flex justify-center items-center md:text-lg lg:text-lg'>
                    <label>Sort by Price: </label>
                    <select value={sortByPrice ?? ''} onChange={(e) =>
                        setSortByPrice(e.target.value === '' ? null : (e.target.value as 'high' | 'low'))}>
                        <option value= ''>No price sorting </option>
                        <option value='high'> Expensive to cheaper</option>
                        <option value='low'> Cheaper to expensive</option>
                </select>
                </div>
            </div>
        );
    };

    export default Filters;