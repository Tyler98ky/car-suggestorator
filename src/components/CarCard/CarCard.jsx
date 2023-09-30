import PropTypes from "prop-types";
import "./CarCard.css";
import Loader from "../Loader";

const CarCard = ({ isLoading, data }) => {
  return (
    <article className="carcard">
      {isLoading && <Loader />}
      <div className="carcard__data">
        <h1>Car Recommendation</h1>
        <article>
          <h2>
            {data.manufacturer} {data.model}
          </h2>
          <h2 className="carcard__price">MSRP: {data.purchaseCost}</h2>
        </article>
      </div>
    </article>
  );
};

// default props
CarCard.defaultProps = {
  data: {
    manufacturer: "Make",
    model: "Model",
    trim: "",
    mpg: "",
    purchaseCost: "in $USD",
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
