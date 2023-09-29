import PropTypes from "prop-types";

const PromptToLocation = (prompt) => {
  const url = "https://api.openai.com/v1/chat/completions";

  // const exampleContent = `I would like a small, fun to drive car, that will cost less than $1000 a month. I don't like SUV's or trucks, and I would love a manual transmission, if it were available. I really do not want a Honda though.`;

  const data = {
    model: "gpt-3.5-turbo-0613",
    messages: [{ role: "user", content: prompt }],
    functions: [
      {
        name: "displayData",
        description: "Suggest a car to own given the requests in the prompt",
        parameters: {
          type: "object",
          properties: {
            manufacturer: {
              type: "string",
              description: "Car manufacturer",
            },
            model: {
              type: "string",
              description: "Specific car model",
            },
            monthlyprice: {
              type: "string",
              description:
                "Median monthly payment for someone to own this car in the USA",
            },
            mpg: {
              type: "string",
              description: "Miles per gallon",
            },
            costtoownfive: {
              type: "string",
              description: "Median cost to own this car for 5 years",
            },
          },
          required: [
            "manufacturer",
            "model",
            "monthlyprice",
            "mpg",
            "costtoown",
          ],
        },
      },
    ],
    function_call: "auto",
  };

  const params = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST",
  };

  return fetch(url, params)
    .then((response) => response.json())
    .then((data) => {
      const promptRes = JSON.parse(
        data.choices[0].message.function_call.arguments
      );
      console.log(promptRes);

      const locationString = () => {
        if (promptRes.countryCode === "US") {
          return `${promptRes.city},${promptRes.state},${promptRes.country}`;
        } else {
          return `${promptRes.city},${promptRes.country}`;
        }
      };

      const promptData = {
        locationString: locationString(),
        units: promptRes.unit,
        country: promptRes.country,
        USstate: promptRes.USstate,
      };

      return promptData;
    })
    .catch((error) => {
      console.log("Error:", error);
      return Promise.reject(
        "Unable to identify a location from your question. Please try again."
      );
    });
};

PromptToLocation.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default PromptToLocation;
