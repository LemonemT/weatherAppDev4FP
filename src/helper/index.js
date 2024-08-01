export const getDay = (string) => {
    return new Date(string * 1000).toUTCString().split(" ").slice(0, 3).join(" ");
  };
  
  export const degToCompass = (num) => {
    const val = Math.floor(num / 22.5 + 0.5);
    const arr = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return arr[val % 16];
  };
  