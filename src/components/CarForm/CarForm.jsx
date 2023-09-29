import { useState } from "react";
import PropTypes from "prop-types";
import "./CarForm.css";

function CarForm({ onSubmit }) {
  const [inputCarDesires, setInputCarDesires] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputCarDesires);
  };

  return (
    <form className="locationform" onSubmit={handleSubmit}>
      <div className="locationform__elements">
        <label htmlFor="location">
          Tell me what you want from your next car:
        </label>
        <textarea
          id="carEntry"
          name="carEntry"
          cols=""
          rows="20"
          placeholder="Write a short description listing things such as size, price, features, etc."
          onChange={(e) => setInputCarDesires(e.target.value)}
        ></textarea>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
}

CarForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default CarForm;
