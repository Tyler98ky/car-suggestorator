import { useEffect, useState } from "react";
import "./App.css";
import useApiRequests from "./components/useApiRequests";
import CarCard from "./components/CarCard";
import CarForm from "./components/CarForm";

function App() {
  const [prompt, setPrompt] = useState("");
  const [carDataLoading, setCarDataLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Custom hook to handle API requests. Fires when prompt changes.
  const { error, promptData, carData } = useApiRequests(prompt);

  // Set error message if error is returned from API request.
  useEffect(() => {
    if (error) {
      setErrorMsg(error);
      setCarDataLoading(false);
    }
  }, [error]);

  // Set carDataLoading to false when weatherData is returned from API request.
  useEffect(() => {
    if (carData != null) {
      setCarDataLoading(false);
    }
  }, [carData]);

  useEffect(() => {
    if (promptData && promptData.units) {
      // setUnits(promptData.units);
    }
  }, [promptData]);

  // Handle form submission. Set prompt to user input.
  const handleSubmit = (newPrompt) => {
    setErrorMsg("");
    setCarDataLoading(true);
    setPrompt(newPrompt);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="page-title">Car Suggest-o-rator</h1>
        <h6>Ya know...like &quot;suggestion generator&quot;? Get it?</h6>
        <CarForm onSubmit={handleSubmit} />
        {error && <p className="error">{errorMsg.message}</p>}
      </header>
      <main className="main-content">
        {carData ? (
          <CarCard isLoading={carDataLoading} data={carData} />
        ) : (
          <CarCard isLoading={carDataLoading} />
        )}
      </main>
    </div>
  );
}

export default App;
