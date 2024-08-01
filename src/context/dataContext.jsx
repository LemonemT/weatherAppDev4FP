import { createContext, useState, useEffect } from "react";
import { degToCompass, getDay } from "../helper";

export const DataContext = createContext(null);

export const DataContextProvider = ({ children }) => {
  const [unit, setUnit] = useState("metric");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [temp, setTemp] = useState(0);
  const [description, setDescription] = useState("");
  const [iconId, setIconId] = useState("");
  const [windStatus, setWindStatus] = useState("");
  const [windDegree, setWindDegree] = useState("");
  const [windDirection, setWindDirection] = useState("");
  const [visibility, setVisibility] = useState("");
  const [humidity, setHumidity] = useState("");
  const [airPressure, setAirPressure] = useState("");
  const [todays, setTodays] = useState("");
  const [list, setList] = useState([]);
  const [location, setLocation] = useState("");
  const [locationArray, setLocationArray] = useState(
    localStorage.getItem("locations")
      ? JSON.parse(localStorage.getItem("locations"))
      : []
  );

  const getReverseGeoCordinate = async ({ lat, lon }) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=cd3a425304d02735c79429500819f184`
      );
      const results = await response.json();
      console.log("results", results);
      setLocation(results && results[0]?.name);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          getReverseGeoCordinate(coordinates);
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  };

  useEffect(() => {
    if (location && !locationArray.includes(location)) {
      const newLocationArray = [...locationArray, location];
      setLocationArray(newLocationArray);
      localStorage.setItem("locations", JSON.stringify(newLocationArray));
    }
  }, [location]);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=cd3a425304d02735c79429500819f184`
        );
        const result = await response.json();
        setTemp(Math.round(result.main.temp));
        setIconId(result.weather[0].icon);
        setLat(result.coord.lat.toString());
        setLon(result.coord.lon.toString());
        setDescription(result.weather[0].main);
        setWindStatus(result.wind.speed.toFixed(1));
        setWindDegree(result.wind.deg);
        setVisibility(result.visibility.toFixed(1));
        setHumidity(result.main.humidity);
        setAirPressure(result.main.pressure);
        setTodays(getDay(result.dt));
        setWindDirection(degToCompass(result.wind.deg));
      } catch (error) {
        console.error(error);
      }
    };
    if (location === "") {
      getCurrentLocation();
    } else {
      getWeather();
    }
  }, [location, unit]);

  useEffect(() => {
    const getForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=cd3a425304d02735c79429500819f184`
        );
        const data = await response.json();
        const list = data?.list.map((item) => {
          return {
            ...item,
            dt_txt: item.dt_txt.split(" ")[0],
          };
        });
        const unique = list?.filter((obj, index) => {
          return index === list.findIndex((o) => obj.dt_txt === o.dt_txt);
        });
        setList(unique);
      } catch (error) {
        console.error(error);
      }
    };
    if (lat !== "" && lon !== "") {
      getForecast();
    }
  }, [lat, lon, unit]);

  return (
    <DataContext.Provider
      value={{
        list,
        unit,
        setUnit,
        location,
        setLocation,
        lat,
        lon,
        temp,
        description,
        iconId,
        todays,
        windStatus,
        windDegree,
        visibility,
        humidity,
        airPressure,
        windDirection,
        locationArray,
        getCurrentLocation,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
