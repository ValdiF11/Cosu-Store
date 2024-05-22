// components/SearchBar.js
"use client";
import React from "react";
interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, onSearch }) => {
  return (
    <div className=" pt-5">
      <div className="flex flex-row items-center justify-center space-x-5">
        <input
          type="text"
          className="input input-bordered input-secondary w-4/6 bg-rose-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products"
        />
        <button
          onClick={onSearch}
          className="bg-rose-600 text-xl text-white px-4 py-2 rounded-md mr-4 hover:bg-white hover:text-rose-600 focus:outline-none focus:bg-rose-900 focus:text-white duration-100"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
