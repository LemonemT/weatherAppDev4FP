import React, { useContext } from "react";
import { DataContext } from "../context/dataContext";
import { WeatherCard } from "./subComponents/WeatherCard";
import NavigationIcon from "@mui/icons-material/Navigation";

export const ForcastHighlights = () => {
  const {
    list,
    unit,
    setUnit,
    changeUnit,
    windStatus,
    windDegree,
    windDirection,
    visibility,
    humidity,
    airPressure,
  } = useContext(DataContext);

  return (
    <>
      <section
        className="p-[8%] pt-[20px] md:w-[71%] lg:w-[76%] xl:w-[69%] md:h-full overflow-y-scroll md:px-[8%] lg:px-[5%] xl:px-[7%] pb-9"
        style={{ backgroundColor: "#100E1D" }}
      >
        <div className="w-full">
          <div className="flex justify-end m-[30px]">
            <button
              className="w-8 h-8 bg-gray-500 rounded-full text-gray-100 focus:bg-gray-100  focus:text-blacksss"
              onClick={() => setUnit("metric")}
              style={{
                backgroundColor: unit === "metric" && "#E7E7EB",
                color: "black",
              }}
            >
              &#8451;
            </button>
            <button
              className="w-8 h-8  bg-gray-500 rounded-full text-gray-100 ml-4 focus:bg-gray-100 focus:text-black "
              onClick={() => setUnit("imperial")}
            >
              &#8457;
            </button>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-2.5 xl:gap-4 ">
            {list?.map(
              (item, index) =>
                index > 0 && <WeatherCard index={index} info={item} />
            )}
          </div>
        </div>
        <div className="w-full">
          <h3 className="mb-8 mt-16 text-gray-100 text-2xl font-display font-bold">
            Today's Highlights
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 md:gap-3 xl:gap-4">
            <div
              className="w-full flex flex-col items-center justify-center p-[7%]"
              style={{ backgroundColor: "#1e213a" }}
            >
              <div className="text-gray-100 font-display font-medium text-base mb-[22px]">
                Wind Status
              </div>
              <span className="text-gray-100 font-display font-bold text-6xl">
                {windStatus}
                <span className="text-gray-100 font-display font-normal text-4xl">
                  {unit === "metric" ? "m/s" : "mph"}
                </span>
              </span>

              <div className="text-gray-100 font-display font-bold mt-2">
                {
                  <span
                    className="inline-block mr-4"
                    style={{
                      transform: `rotate(${windDegree}deg)`,
                    }}
                  >
                    <NavigationIcon />
                  </span>
                }
                {windDirection}
              </div>
            </div>
            <div
              className="w-full flex flex-col items-center justify-center p-[7%]"
              style={{ backgroundColor: "#1e213a" }}
            >
              <div className="text-gray-100 font-display font-medium text-base mb-[22px]">
                {"Humidity"}
              </div>
              <span className="text-gray-100 font-display font-bold text-6xl">
                {humidity}
                <span className="text-gray-100 font-display font-normal text-4xl">
                  %
                </span>
              </span>

              <div className="w-[70%] mt-5 text-gray-100">
                <span className="flex justify-between text-base">
                  <p>0</p>
                  <p>50</p>
                  <p>100</p>
                </span>
                <span className="w-full bg-slate-100 h-3 mt-2 block rounded-2xl relative">
                  <span
                    className="block h-full rounded-2xl after:content-['%'] after:absolute after:right-0 after:top-3 after:text-[12px] after:text-gray-500"
                    style={{
                      backgroundColor: "#FFEC65",
                      width: `${humidity}%`,
                    }}
                  ></span>
                </span>
              </div>
            </div>

            <div
              className="w-full flex flex-col items-center justify-center p-[7%]"
              style={{ backgroundColor: "#1e213a" }}
            >
              <div className="text-gray-100 font-display font-medium text-base mb-[22px]">
                Visibility
              </div>
              <span className="text-gray-100 font-display font-bold text-6xl">
                {Math.round(visibility / 1609)}{" "}
                <span className="text-gray-100 font-display font-normal text-4xl">
                  Miles
                </span>
              </span>
            </div>
            <div
              className="w-full flex flex-col items-center justify-center p-[7%]"
              style={{ backgroundColor: "#1e213a" }}
            >
              <div className="text-gray-100 font-display font-medium text-base mb-[22px]">
                Air Pressure
              </div>
              <span className="text-gray-100 font-display font-bold text-6xl">
                {airPressure}{" "}
                <span className="text-gray-100 font-display font-normal text-4xl">
                  mb
                </span>
              </span>
            </div>
          </div>
          <footer className="text-gray-500 text-sm text-center mt-[80px] font-mont font-medium">
            created by{" "}
            <span className="text-gray-500 font-bold  text-sm underline">
              <a>Lenin Torres </a>{" "}
            </span>
            <a>@ devChallenges.io</a>
          </footer>
        </div>
      </section>
    </>
  );
};
