import React, { useState } from "react";
import { FaPlane } from "react-icons/fa6";
import "./returnflights.scss";

const ReturnFlights = ({ flights, onSortChange }) => {
  const [sortOrderReturn, setSortOrderReturn] = useState("");

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrderReturn(order);
    onSortChange(order, "return");
  };

  return (
    <div className="flights">
      {!flights || flights.length === 0 ? (
        " "
      ) : (
        <div className="flights-container">
          <select onChange={(e) => handleSortChange(e, "filtered")}>
            <option value="" selected>
              Select Filter
            </option>
            <option value="lowToHigh">Price (Low to High)</option>
            <option value="highToLow">Price (Hight to Low)</option>
            <option value="departureTime">Early Departure</option>
          </select>
          <ul className="flight-list">
            <h1>Return</h1>
            {flights.map((flight) => (
              <li key={flight.id}>
                <div className="container">
                  <div className="wrapper">
                    <div className="left">
                      <span>{flight.departureTime}</span>
                      <span>{flight.departureCityCode}</span>
                    </div>
                    <div className="middle">
                      <div className="line"></div>
                      <div className="icon">
                        <span>{flight.duration}h</span>
                        <i>
                          <FaPlane />
                        </i>
                      </div>

                      <div className="dashed"></div>
                    </div>
                    <div className="right">
                      <span>{flight.arrivalTime}</span>
                      <span>{flight.arrivalCityCode}</span>
                    </div>
                  </div>
                  <div className="info">
                    <span>{flight.airline}</span>
                    <span>${flight.price}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReturnFlights;
