import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Flights from "../../components/flights/Flights";
import Navbar from "../../components/navbar/Navbar";
import ReturnFlights from "../../components/returnflights/ReturnFlights";
import Search from "../../components/search/Search";
import { DarkModeContext } from "../../context/darkModeContext";
import "./flightspage.scss";

const Flightspage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [isOneWay, setIsOneWay] = useState(false);
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch(
          "https://64e8b72699cf45b15fe00a70.mockapi.io/api/flights"
        );
        const allFlights = await response.json();

        let departures = [];
        let returns = [];
        if (state) {
          setIsOneWay(state.oneWay);
          departures = allFlights.filter(
            (flight) =>
              flight.departureCity.includes(state.departure) &&
              flight.arrivalCity.includes(state.arrival)
          );
          returns = allFlights.filter(
            (flight) =>
              flight.departureCity.includes(state.arrival) &&
              flight.arrivalCity.includes(state.departure)
          );
        } else {
          departures = allFlights;
        }

        setFilteredFlights(departures);
        setReturnFlights(returns);
      } catch (error) {
        console.error("Flights fetch failed:", error);
      }
    };

    fetchFlights();
  }, [state]);

  const sortFlights = (flights, order) => {
    return [...flights].sort((a, b) => {
      if (order === "lowToHigh") {
        return a.price - b.price;
      } else if (order === "highToLow") {
        return b.price - a.price;
      } else if (order === "departureTime") {
        return (a.departureTime || "").localeCompare(b.departureTime || "");
      } else if (order === "returnDepartureTime") {
        return (a.departureTime || "").localeCompare(b.departureTime || "");
      } else {
        return 0;
      }
    });
  };

  const handleSortChange = (order, type) => {
    const sortedFlights = sortFlights(
      type === "filtered" ? filteredFlights : returnFlights,
      order
    );
    if (type === "filtered") {
      setFilteredFlights(sortedFlights);
    } else {
      setReturnFlights(sortedFlights);
    }
  };

  const handleOneWayChange = (isChecked) => {
    setIsOneWay(isChecked);
  };

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Navbar />
      <Search />
      <div style={{ display: "flex" }}>
        <div
          className="flight-bg"
          style={{ flex: "6", display: "flex", justifyContent: "center" }}
        >
          <Flights
            flights={filteredFlights}
            onSortChange={(order) => handleSortChange(order, "filtered")}
          />
          {!isOneWay && (
            <ReturnFlights
              flights={returnFlights}
              onSortChange={(order) => handleSortChange(order, "return")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Flightspage;
