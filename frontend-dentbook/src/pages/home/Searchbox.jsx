import React from "react";

const Searchbox = () => {
  return (
    <div className="mainSearchContainer">
      <h2 className="mainHeading">Main Heading</h2>
      <div className="nestedDiv">
        <h3>Sub Heading</h3>
        <form onSubmit={(e) => e.preventDefault()} className="searchForm">
          <input
            type="search"
            className="border border-gray-300 rounded-md px-4 py-2 mr-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Searchbox;
