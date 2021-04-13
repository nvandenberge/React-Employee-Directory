import React from "react";

const Sort = ({ handleSort, header}) => {
return (
    <div>
        <th> {header}
        <button
            onClick={handleSort}
            className="bg-gray rounded ml-1"
        >
            Sort
        </button>
        </th>
    </div>
)
}

export default Sort;