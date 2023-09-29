import PropTypes from "prop-types";

const PromptToLocation = (prompt) => {
  const url = "https://api.openai.com/v1/chat/completions";

  // const exampleContent = `I would like a small, fun to drive car, that will cost less than $1000 a month. I don't like SUV's or trucks, and I would love a manual transmission, if it were available. I really do not want a Honda though.`;
  // const exampleContentTruck = `I love big trucks. However, I would love to not pay too much in gas for one, since I drive a lot. I would need at least 4 seats, and enough power to tow a boat every once in a while.`
  // const exampleContentCheapTruck = `I love big trucks. However, I only like them for the looks. I don't need to tow or haul anything. I want the most economical truck I can buy.`

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
            mpg: {
              type: "string",
              description: "Miles per gallon",
            },
            purchaseCost: {
              type: "string",
              description: "Median sale price",
            },
          },
          required: ["manufacturer", "model", "mpg", "purchaseCost"],
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

      const promptData = {
        manufacturer: promptRes.manufacturer,
        model: promptRes.model,
        mpg: promptRes.mpg,
        purchaseCost: promptRes.purchaseCost,
      };

      return promptData;
    })
    .catch((error) => {
      console.log("Error:", error);
      return Promise.reject(
        "Unable to identify a car from your prompt. Please try again."
      );
    });
};

PromptToLocation.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default PromptToLocation;
