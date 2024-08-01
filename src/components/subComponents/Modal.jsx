import React, { useState, useContext } from "react";
import { DropDown } from "./DropDown";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { DataContext } from "../../context/dataContext";

export const Modal = ({ handleModal }) => {
  const { setLocation, locationArray } = useContext(DataContext);

  const [searchInput, setSearchInput] = useState("");
  const [searchOptions, setSearchOptions] = useState(null);

  console.log("locationArray", locationArray);
  const handleSubmit = () => {
    setLocation(searchInput);
    handleModal();
  };
  const handleChange = (e) => {
    getSearchOptions(e.target.value);
    setSearchInput(e.target.value);
  };
  const onRecentSearchClick = (item) => {
    setLocation(item);
    handleModal();
  };

  const getSearchOptions = async (value) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=6d381d289698628fa8be22cc0edc51fc`
      );
      const data = await response.json();
      console.log("searchData", data);

      setSearchOptions(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="container absolute h-full top-0 left-0 p-4"
      style={{ backgroundColor: "#1e213a" }}
    >
      <button
        className="w-8 h-8 text-gray-100 float-right "
        onClick={handleModal}
      >
        <CloseIcon />
      </button>
      <div className="flex justify-between mt-12">
        <span className="absolute text-gray-100 mt-3 left-8 hover:cursor-pointer">
          <SearchIcon />
        </span>
        <input
          className="p-3 pl-12 mr-2 w-full bg-transparent border border-gray-100 text-gray-100 outline-none"
          type="text"
          name="serach"
          id="search"
          placeholder="Search Location"
          value={searchInput}
          onChange={handleChange}
        />
        <button
          className="bg-blue-600 p-3 text-gray-100"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
      {searchOptions?.length > 0 ? (
        <DropDown results={searchOptions} handleModal={handleModal} />
      ) : (
        ""
      )}
      <ul className="mt-12">
        {locationArray &&
          locationArray.length > 0 &&
          locationArray.map((item) => (
            <li
              className="h-[64px] hover:cursor-pointer"
              onClick={() => onRecentSearchClick(item)}
            >
              <p className="text-gray-100 font-medium text-base">{item}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};