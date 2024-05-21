import React from "react";
import { useDispatch } from "react-redux";
import { SearchCarbonAmetionDataAsync } from "../DataSlice";

import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    dispatch(SearchCarbonAmetionDataAsync(searchTerm));
  };

  return (
    <div className=" w-full pt-4  items-start ">
      <form className="flex flex-col items-start justify-center gap-2">
        <div className="relative flex items-center bg-gray-100 rounded-lg dark:bg-gray-800">
          <IoIosSearch size={40} />
          <input
            id="search"
            type="search"
            className="w-full px-10 py-3 text-sm text-gray-700 bg-transparent focus:outline-none  rounded-lg dark:text-gray-200 dark:placeholder-gray-400"
            placeholder="Search company"
            required
            onChange={handleSearch}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
