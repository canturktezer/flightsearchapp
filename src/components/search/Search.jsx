import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AirportSuggestions from "../airportsuggestions/AirportSuggestions";
import LoadingAnimation from "../loadinganimation/LoadingAnimation";
import "./search.scss";

const Search = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchParams, setSearchParams] = useState({
    oneWay: false,
    departure: "",
    arrival: "",
    departureDate: "",
    returnDate: "",
  });
  const [airports, setAirports] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://64e8b72699cf45b15fe00a70.mockapi.io/api/airports")
      .then((response) => response.json())
      .then((data) => {
        setAirports(data);
      })
      .catch((error) => {
        console.error("Error fetching airports:", error);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://64e8b72699cf45b15fe00a70.mockapi.io/api/flights")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFlights(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    const { id, value, type, checked } = event.target;
    setSearchParams((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));

    if (id === "departure" || id === "arrival") {
      const filtered = airports.filter((airport) =>
        airport.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredAirports(filtered);
      setFocusedInput(id);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !searchParams.departure ||
      !searchParams.arrival ||
      !searchParams.departureDate ||
      (!searchParams.oneWay && !searchParams.returnDate)
    ) {
      setErrorMessage("Lütfen tüm gerekli alanları doldurun.");
      return;
    }
    setErrorMessage("");
    const results = flights.filter((flight) => {
      const matchDeparture = flight.departureCity.includes(
        searchParams.departure
      );
      const matchArrival = flight.arrivalCity.includes(searchParams.arrival);
      return matchDeparture && matchArrival;
    });
    setIsSubmitted(true);
    navigate("/flights", { state: { ...searchParams } });
    setFilteredFlights(results);
  };

  const handleDepartureSuggestionClick = (airport) => {
    setSearchParams((prev) => ({
      ...prev,
      departure: airport.name,
    }));
    setFilteredAirports([]);
  };

  const handleArrivalSuggestionClick = (airport) => {
    setSearchParams((prev) => ({
      ...prev,
      arrival: airport.name,
    }));
    setFilteredAirports([]);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingAnimation />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div className="search">
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="container">
                <div className="oneWay">
                  <label style={{ fontWeight: "700" }} htmlFor="oneWay">
                    One Way:
                  </label>
                  <input
                    type="checkbox"
                    id="oneWay"
                    checked={searchParams.oneWay}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label style={{ fontWeight: "700" }} htmlFor="departure">
                      From:
                    </label>
                    <input
                      type="text"
                      id="departure"
                      value={searchParams.departure}
                      onChange={handleInputChange}
                      placeholder="Departure Airport"
                      onFocus={() => setFocusedInput("departure")}
                    />
                    {focusedInput === "departure" &&
                      filteredAirports.length > 0 && (
                        <AirportSuggestions
                          suggestions={filteredAirports}
                          onSuggestionClick={handleDepartureSuggestionClick}
                          className="suggestions-departure"
                        />
                      )}
                  </div>

                  <div className="input-group">
                    <label style={{ fontWeight: "700" }} htmlFor="arrival">
                      To:
                    </label>
                    <input
                      type="text"
                      id="arrival"
                      value={searchParams.arrival}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedInput("arrival")}
                      placeholder="Arrival Airport"
                    />
                    {focusedInput === "arrival" &&
                      filteredAirports.length > 0 && (
                        <AirportSuggestions
                          suggestions={filteredAirports}
                          onSuggestionClick={handleArrivalSuggestionClick}
                          className="suggestions-arrival"
                        />
                      )}
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label
                      style={{ fontWeight: "700" }}
                      htmlFor="departureDate"
                    >
                      Depart:
                    </label>
                    <input
                      type="date"
                      id="departureDate"
                      value={searchParams.departureDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="input-group">
                    <label style={{ fontWeight: "700" }} htmlFor="returnDate">
                      Return:
                    </label>
                    <input
                      type="date"
                      id="returnDate"
                      value={searchParams.returnDate}
                      onChange={handleInputChange}
                      disabled={searchParams.oneWay}
                    />
                  </div>
                </div>
                <button className="search-button" type="submit">
                  Search
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Search;
