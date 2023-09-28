import PropTypes from "prop-types";
import "./CarCard.css";
import Loader from "../Loader";

// Translate temperature from Kelvin to Celsius or Fahrenheit.
const tempTranslator = (temp, unit) => {
  const allTemps = {
    k: {
      value: temp,
      unit: "°k",
    },
    c: {
      value: temp - 273,
      unit: "°C",
    },
    f: {
      value: 1.8 * (temp - 273) + 32,
      unit: "°F",
    },
  };
  if (unit === "metric") {
    return allTemps.c;
  } else if (unit === "imperial") {
    return allTemps.f;
  } else {
    return allTemps.k;
  }
};

// Translate wind speed from meters per second to feet per second.
const speedTranslator = (speed, units) => {
  const allSpeeds = {
    metric: {
      value: speed,
      unit: "m/s",
    },
    imperial: {
      value: speed * 3.281,
      unit: "ft/s",
    },
  };
  if (units === "metric") {
    return allSpeeds.metric;
  } else if (units === "imperial") {
    return allSpeeds.imperial;
  } else {
    return allSpeeds.metric;
  }
};

const WeatherCard = ({
  isLoading,
  data,
  units,
  country,
  USstate,
  setUnits,
}) => {
  // Display state if country is US.
  const stateDisplay = () => {
    if (data.sys.country === "US") {
      return `, ${USstate}`;
    } else {
      return "";
    }
  };

  // Handle unit change.
  const handleUnitChange = () => {
    if (units === "metric") {
      setUnits("imperial");
    } else {
      setUnits("metric");
    }
  };

  // Set wind direction.
  const windDirStyle = {
    transform: `rotate(${data.wind.deg + 90}deg)`,
  };

  return (
    <article className="weathercard">
      {isLoading && <Loader />}
      <div className="weathercard__data">
        <div className="weathercard__meta">
          <div className="weathercard__meta-location">{`${
            data.name
          }${stateDisplay()}, ${country}`}</div>
        </div>
        <div className="weathercard__temp">
          <span className="temp">
            {tempTranslator(data.main.temp, units).value.toFixed(1)}
          </span>
          <span className="tempunit">
            {tempTranslator(data.main.temp, units).unit}
          </span>
        </div>
        <div className="weathercard__wind">
          <div className="weathercard__wind-speed">
            <span className="speed">
              {speedTranslator(data.wind.speed, units).value.toFixed(1)}
            </span>
            <span className="windunit">
              {speedTranslator(data.wind.speed, units).unit}
            </span>
          </div>
          <div className="weathercard__wind-dir" style={windDirStyle}>
            <span className="screen-reader-text">${data.wind.deg}</span>
          </div>
        </div>
        <button id="units" onClick={handleUnitChange}>
          Change units
        </button>
      </div>
    </article>
  );
};

// default props
WeatherCard.defaultProps = {
  data: {
    name: "--",
    sys: {
      country: "--",
    },
    main: {
      temp: 273,
    },
    wind: {
      speed: 0,
      deg: 0,
    },
  },
  units: "metric",
  setUnits: () => {},
};

// props validation
WeatherCard.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({
    name: PropTypes.string,
    sys: PropTypes.shape({
      country: PropTypes.string,
    }),
    main: PropTypes.shape({
      temp: PropTypes.number,
    }),
    wind: PropTypes.shape({
      speed: PropTypes.number,
      deg: PropTypes.number,
    }),
  }),
  units: PropTypes.string,
  country: PropTypes.string,
  USstate: PropTypes.string,
  setUnits: PropTypes.func,
};

const CarCard = ({ data }) => {
  return (
    <article className="carcard">
      <h1>Car Recommendation</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <p>
        This is a short description of why the Daewoo 6500 is such a dope car
        for you
      </p>
    </article>
  );
};

// default props
CarCard.defaultProps = {
  data: {
    manufacturer: "Daewoo",
    model: "Civic Type R",
    trim: "",
    monthlyprice: "",
    mpg: "",
  },
  currency: "USD",
  setUnits: () => {},
};

CarCard.propTypes = {
  data: PropTypes.shape({
    manufacturer: PropTypes.string,
    model: PropTypes.string,
    trim: PropTypes.string,
    monthlyprice: PropTypes.string,
    mpg: PropTypes.string,
  }),
};

export default CarCard;
