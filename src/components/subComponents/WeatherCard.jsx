import React, { useContext } from "react";
import { DataContext } from "../../context/dataContext";
import { getDay } from "../../helper";

export const WeatherCard = ({ info, index }) => {
  const { unit } = useContext(DataContext);
  return (
    <div
      className="flex flex-col items-center justify-center p-2 w-[45%] sm:w-[30%] lg:w-[18%] min-w-[123px] min-h-[170px]"
      style={{ backgroundColor: "#1e213a" }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="text-gray-100 text-base font-display font-medium ">
          {index == 1 ? "Tomorrow" : getDay(info.dt)}
        </div>
        <img
          src={`http:openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`}
          alt=""
        />
      </div>
      <div>
        <span className="mr-4 text-gray-100 text-base font-display font-medium">
          {Math.ceil(info.main.temp_max)}
          {unit == "imperial" ? <>&#8457;</> : <>&#8451;</>}
        </span>
        <span className="text-gray-500 text-base font-display font-medium">
          {Math.floor(info.main.temp_min)}
          {unit == "imperial" ? <>&#8457;</> : <>&#8451;</>}
        </span>
      </div>
    </div>
  );
};
