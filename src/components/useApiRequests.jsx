import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PromptToCar from "./PromptToCar";
import CarDescript from "./CarDescript";
import CarToImage from "./CarToImage";
import "https://apis.google.com/js/api.js";


function loadClient() {
  gapi.client.setApiKey("AIzaSyCVmQGx7TZ1WFdkhwE9JHJJKsdHG67OhDM");
  return gapi.client
    .load(
      "https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest"
    )
    .then(
      function () {
        console.log("GAPI client loaded for API");
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
}

const useApiRequests = (prompt) => {
    gapi.load("client", {
      callback: function () {
        // Handle gapi.client initialization.
        return loadClient();
      },
      onerror: function () {
        // Handle loading error.
        alert("gapi.client failed to load!");
      },
      timeout: 5000, // 5 seconds.
      ontimeout: function () {
        // Handle timeout.
        alert("gapi.client could not load in a timely manner!");
      },
    })

  const [error, setError] = useState(null);
  const [carData, setCarData] = useState(null);
  const [carDescription, setCarDescription] = useState(null);
  const [carImageUrl, setCarImageUrl] = useState(null);

  // Fetch car suggestion from API.
  useEffect(() => {
    const fetchData = async () => {
      if (!prompt) return; // return if prompt is null or undefined

      try {
        const promptDataRes = await PromptToCar(prompt);
        setCarData(promptDataRes);

        // fetch a carImageUrl based on promptDataRes.manufacturer + promptDataRes.model
        const carImageRes = await CarToImage(gapi.client, promptDataRes);
        setCarImageUrl(carImageRes);
        console.log("CarImg: ", carImageRes);

        const carDescriptRes = await CarDescript(prompt, promptDataRes);
        setCarDescription(carDescriptRes);
      } catch (error) {
        setError(error);
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [prompt]); // run effect when `prompt` is submitted and changed

  return { error, carData, carDescription, carImageUrl };
};

useApiRequests.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default useApiRequests;
