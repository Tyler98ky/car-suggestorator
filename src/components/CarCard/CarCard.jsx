import PropTypes from "prop-types";
import "./CarCard.css";
import Loader from "../Loader";
import { ParticlesContainer } from "../ParticlesContainer/ParticlesContainer";

const CarCard = ({ isLoading, data, carImageUrl }) => {
  return (
    <article className="carcard">
      {isLoading && <Loader />}
      <ParticlesContainer />
      <div className="carcard__data">
        <h1>Car Recommendation</h1>
        <article>
          <h2>
            {data.manufacturer} {data.model}
          </h2>
          <img
            src={carImageUrl}
            alt={`Picture of 2022 ${data.manufacturer} ${data.model}`}
          />
          <h2 className="carcard__price">MSRP: {data.purchaseCost}</h2>
        </article>
      </div>
    </article>
  );
};

// default props
CarCard.defaultProps = {
  data: {
    trim: "",
    mpg: "",
    purchaseCost: "in $USD",
  },
  carImageUrl: "src/assets/react.svg",
};

CarCard.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({
    manufacturer: PropTypes.string,
    model: PropTypes.string,
    mpg: PropTypes.string,
    purchaseCost: PropTypes.string,
  }),
  carImageUrl: PropTypes.string,
};

export default CarCard;
