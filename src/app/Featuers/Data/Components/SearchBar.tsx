import React from "react";
import { useDispatch } from "react-redux";
import { SearchCarbonAmetionDataAsync } from "../DataSlice";

import { Input } from "@/components/ui/input";

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    dispatch(SearchCarbonAmetionDataAsync(searchTerm));
  };

  return (
    <div className="w-full py-4 items-center flex justify-between">
      <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Esg Report
      </div>
      <form className="flex flex-col items-start justify-center gap-2">
        <div className="relative flex items-center">
          <Input
            className="rounded-r-full rounded-l-full"
            type="search"
            placeholder="Search"
            onChange={handleSearch}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
