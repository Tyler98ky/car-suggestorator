import PropTypes from "prop-types";

const CarDescript = (prompt, carData) => {
  const url = "https://api.openai.com/v1/chat/completions";

  const sysMsg = `In a conversational professional tone, answer the [Question] based on the [Car]. Return 4 bullet points answering the following concerns. 

- Provide 1 sentence of an opinion about why this car fits the prompt's needs.
- Provide 1 sentence of an opinion about why this car fits the prompt's needs.
- Provide 1 sentence of an opinion about why this car fits the prompt's needs. 
- Provide 1 sentence of a breakdown of the expected monthly cost of ownership for this car. Try to provide number estimates.`;

  const newPrompt = `Question: ${prompt}. Car Data: ${JSON.stringify(carData)}`;

  const data = {
    model: "gpt-4-0613",
    messages: [
      { role: "system", content: sysMsg },
      { role: "user", content: newPrompt },
    ],
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
      return data.choices[0].message.content;
    })
    .catch((error) => {
      console.log("Error:", error);
      return Promise.reject("Unable to fetch car description.");
    });
};

CarDescript.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default CarDescript;
