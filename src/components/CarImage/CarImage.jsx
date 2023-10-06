import PropTypes from "prop-types";
import "./CarCard.css";

const CarImage = ({ url, data }) => {
  return (
    <article className="carcard">
      <img src={url} alt={`Picture of a ${data.manufacturer} ${data.model}`} />
      <div></div>
    </article>
  );
};

// default props
CarImage.defaultProps = {
  url: "/react.svg",
  data: {
    manufacturer: "Make",
    model: "Model",
    trim: "",
    mpg: "",
    purchaseCost: "in $USD",
  },
};

CarImage.propTypes = {
  url: PropTypes.string,
  data: PropTypes.shape({
    manufacturer: PropTypes.string,
    model: PropTypes.string,
    mpg: PropTypes.string,
    purchaseCost: PropTypes.string,
  }),
};

export default CarImage;
