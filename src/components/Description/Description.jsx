import PropTypes from "prop-types";
import "./Description.css";
import Loader from "../Loader";

const Description = ({ isLoading, carDescription }) => {
  return (
    <div className="description">
      <h2 className="description__title">Description</h2>
      <div className="description__divider">
        {isLoading && <Loader />}
        <pre className="description__text">
          {carDescription.replaceAll("\n", "\n\n")}
        </pre>
      </div>
    </div>
  );
};
Description.defaultProps = {
  carDescription: "Waiting for car data.",
};

Description.propTypes = {
  isLoading: PropTypes.bool,
  carDescription: PropTypes.string,
};

export default Description;
