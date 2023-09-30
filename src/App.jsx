import { useEffect, useState } from "react";
import "./App.css";
import useApiRequests from "./components/useApiRequests";
import CarCard from "./components/CarCard";
import CarForm from "./components/CarForm";
import Description from "./components/Description";

function App() {
  const [prompt, setPrompt] = useState("");
  const [carDataLoading, setCarDataLoading] = useState(false);
  const [carDescriptLoading, setCarDescriptLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Custom hook to handle API requests. Fires when prompt changes.
  const { error, carData, carDescription } = useApiRequests(prompt);

  // Set error message if error is returned from API request.
  useEffect(() => {
    if (error) {
      setErrorMsg(error);
      setCarDataLoading(false);
      setCarDescriptLoading(false);
    }
  }, [error]);

  // Set carDataLoading to false when weatherData is returned from API request.
  useEffect(() => {
    if (carData) {
      setCarDataLoading(false);
    }
  }, [carData]);

  useEffect(() => {
    if (carDescription) {
      setCarDescriptLoading(false);
    }
  }, [carDescription]);

  // Handle form submission. Set prompt to user input.
  const handleSubmit = (newPrompt) => {
    setErrorMsg("");
    setCarDataLoading(true);
    setCarDescriptLoading(true);
    setPrompt(newPrompt);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="page-title">Car Suggest-o-rator</h1>
        {/* <h6>Ya know...like &quot;suggestion generator&quot;? Get it?</h6> */}
        <CarForm onSubmit={handleSubmit} />
        {error && <p className="error">{errorMsg}</p>}
        {carDescription ? (
          <Description
            isLoading={carDescriptLoading}
            carDescription={carDescription}
          />
        ) : (
          <Description isLoading={carDescriptLoading} />
        )}
      </header>
      <main className="main-content">
        {carData && !errorMsg ? (
          <CarCard isLoading={carDataLoading} data={carData} />
        ) : (
          <CarCard isLoading={carDataLoading} />
        )}
      </main>
    </div>
  );
}

export default App;
