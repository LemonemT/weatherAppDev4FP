import React, { useState, useContext } from "react";
import { DataContext } from "../../context/dataContext";

export const DropDown = ({ results, handleModal }) => {
  const { searchOptions, setLocation } = useContext(DataContext);

  const handleSelect = (option) => {
    setLocation(option.name);
    handleModal();
  };

  return (
    <>
      <div class="mt-2 py-2 w-full bg-white rounded-lg shadow-xl">
        {results?.map((option, index) => (
          <a
            href="#"
            class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
            key={index}
            onClick={() => handleSelect(option)}
          >
            {option.name + ", " + option.state}
          </a>
        ))}
      </div>
    </>
  );
};
