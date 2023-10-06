import PropTypes from "prop-types";
import "https://apis.google.com/js/api.js";

const CarToImage = (gapiClient, carData) => {
  return gapiClient.search.cse
    .list({
      cx: `${import.meta.env.VITE_GOOG_ENGINE}`,
      fileType: ".png",
      num: 1,
      q: `2022-${carData.manufacturer}-${carData.model}`,
      searchType: "image",
    })
    .then((response) => {
      // Handle the results here (response.result has the parsed body).
      return response.result.items[0].link;
    })
    .catch((error) => {
      console.error("Execute error", error);
      return Promise.reject("Unable to fetch car image");
    });
};

CarToImage.propTypes = {
  carData: PropTypes.string.isRequired,
};

export default CarToImage;
