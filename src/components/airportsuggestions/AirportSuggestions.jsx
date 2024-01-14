import React from 'react';
import "./airportsuggestion.scss";

const AirportSuggestions = ({ suggestions, onSuggestionClick }) => {
  return (
    <ul className="suggestions">
      {suggestions.map((airport) => (
        <li
          key={airport.id}
          onClick={() => onSuggestionClick(airport)}
        >
          {airport.name} ({airport.code})
        </li>
      ))}
    </ul>
  );
};

export default AirportSuggestions;
