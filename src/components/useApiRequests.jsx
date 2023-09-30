import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PromptToCar from "./PromptToCar";
import CarDescript from "./CarDescript";

const useApiRequests = (prompt) => {
  const [error, setError] = useState(null);
  const [carData, setCarData] = useState(null);
  const [carDescription, setCarDescription] = useState(null);

  // Fetch car suggestion from API.
  useEffect(() => {
    const fetchData = async () => {
      if (!prompt) return; // return if prompt is null or undefined

      try {
        const promptDataRes = await PromptToCar(prompt);
        setCarData(promptDataRes);

        const carDescriptRes = await CarDescript(prompt, promptDataRes);
        setCarDescription(carDescriptRes);
      } catch (error) {
        setError(error);
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [prompt]); // run effect when `prompt` is submitted and changed

  return { error, carData, carDescription };
};

useApiRequests.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default useApiRequests;
