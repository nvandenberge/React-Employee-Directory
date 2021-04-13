import React from "react";

const Filter = ({filter, setFilter}) => {
  return (
    <div>
      <label>
        Filter:
        <input
          name="filter"
          value={filter}
          onChange={setFilter}
          placeholder="Filter by last name"
        />
      </label>
    </div>
  );
};

export default Filter;
