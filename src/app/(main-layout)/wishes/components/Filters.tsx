import React from 'react';
import {useAppContext} from "@/app/Context";


const Filters = () => {
const {sortByDate, sortByPrice, setSortByPrice, setSortByDate} = useAppContext();

    return (
        <div className='w-160 h-15 bg-black/30 flex gap-4 justify-around p-2 rounded'>
            <div className= 'w-65 h-11 rounded bg-white gap-4 flex justify-center items-center'>
            <label> Sort by Date:</label>
            <select value={sortByDate} onChange={(e) => setSortByDate(e.target.value as 'newest' | 'oldest')}>
                <option value='newest'> Newest to oldest</option>
                <option value='oldest'> Oldest to newest</option>
            </select>
            </div>
            <div className= 'w-75 h-11 rounded bg-white flex justify-center items-center' >
            <label>Sort by Price: </label>
            <select value={sortByPrice} onChange={(e)=>setSortByPrice(e.target.value as 'high' | 'low')}>
                <option value='high'> Expensive to cheaper</option>
                <option value='low'> Cheaper to expensive</option>
            </select>
            </div>
        </div>
    );
};

export default Filters;