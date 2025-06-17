//src/Components/Filterbar.jsx

import React from 'react';
import { useTaskContext } from '../Context/TaskContext';

function Filterbar() {
    const { handleFilterClick } = useTaskContext();

    return (
        <div className="flex justify-center mt-8">
            <button
                className="filter-button bg-blue-500 
                hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l"
                onClick={() => handleFilterClick('all')}
            >
                All
            </button>
            <button
                className="filter-button bg-blue-500 hover:bg-blue-600
                 text-white font-bold py-2 px-4"
                onClick={() => handleFilterClick('completed')}
            >
                Completed
            </button>
            <button
                className="filter-button bg-blue-500 hover:bg-blue-600
                 text-white font-bold py-2 px-4 rounded-r"
                onClick={() => handleFilterClick('todo')}
            >
                To Do
            </button>
        </div>
    );
}

export default Filterbar;