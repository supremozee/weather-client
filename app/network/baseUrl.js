const enviroment = process.env.NODE_ENV;
const baseUrl =
  enviroment === "development"
    ? "http://localhost:5000/weather/api/v1"
    : "https://weather-api5.onrender.com/weather/api/v1";

export default baseUrl;
