import PropTypes from "prop-types";
import "./CarCard.css";
import Loader from "../Loader";

const CarCard = ({ isLoading, data }) => {
  return (
    <article className="carcard">
      {isLoading && <Loader />}
      <div className="carcard__data">
        <h1>Car Recommendation</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </article>
  );
};

// default props
CarCard.defaultProps = {
  data: {
    manufacturer: "Honda",
    model: "Civic Type R",
    trim: "",
    mpg: "",
    purchaseCost: "$10,000",
  },
  currency: "USD",
  setUnits: () => {},
};

CarCard.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({
    manufacturer: PropTypes.string,
    model: PropTypes.string,
    mpg: PropTypes.string,
    purchaseCost: PropTypes.string,
  }),
};

export default CarCard;
