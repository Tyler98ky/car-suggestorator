import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PromptToCar from "./PromptToCar";

const useApiRequests = (prompt) => {
  const [error, setError] = useState(null);
  const [promptData, setPromptData] = useState({});
  const [carData, setCarData] = useState({});

  /**
   * Current flow should go as follows
   * 1. Enter a description of what you want
   * 2. Capture that prompt input and send to openai
   * 3. openai returns a single object representing a car, like whats in my default values
   */

  /**
   * Ideally,later, I want to implement a second openai request that from
   * that prompt that tells me why the ai chose that car, and how it fits your needs.
   */

  // Fetch location and weather data from API.
  useEffect(() => {
    const fetchData = async () => {
      if (!prompt) return; // return if prompt is null or undefined

      try {
        const promptDataRes = await PromptToCar(prompt);
        setPromptData(promptDataRes);

        setCarData(JSON.stringify(promptDataRes, null, 4));
      } catch (error) {
        setError(error);
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [prompt]); // run effect when `prompt` is submitted and changed

  return { error, promptData, carData };
};

useApiRequests.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default useApiRequests;
