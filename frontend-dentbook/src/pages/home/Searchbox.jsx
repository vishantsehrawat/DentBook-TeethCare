import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import searchHomepageApi from "../../api/searchHomepageApi";
const Searchbox = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    dispatch(searchHomepageApi());
  };

  const { data, isLoading, isError } = useSelector((store) => {
    return store.reducer;
  });
  return (
    <div className="mainSearchContainer">
      <h2 className="mainHeading">Main Heading</h2>
      <div className="nestedDiv">
        <h3>Sub Heading</h3>
        <form onSubmit={(e) => e.preventDefault()} className="searchForm">
          <input
            type="search"
            value={searchInput}
            className="border border-gray-300 rounded-md px-4 py-2 mr-2"
            // onChange={(e) => {
            //   setSearchInput(e.target.value);
            // }}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <button
            disabled={isLoading}
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
