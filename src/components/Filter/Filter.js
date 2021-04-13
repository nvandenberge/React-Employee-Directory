import React from "react";

const Filter = ({filter, setFilter}) => {
  return (
    <div className="mb-3">
      <label>
        Filter: 
        <input
          name="filter"
          value={filter}
          onChange={setFilter}
          placeholder="Filter by last name"
          className="ml-1"
        />
      </label>
    </div>
  );
};

export default Filter;
