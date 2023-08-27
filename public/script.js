const departureInput = document.getElementById("departure");
const arrivalInput = document.getElementById("arrival");

document
  .getElementById("flightForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const oneWayCheckbox = document.getElementById("one-way");
    const loadingDiv = document.getElementById("loading");
    const resultDiv = document.querySelector("#result");
    const departureValue = departureInput.value;
    const arrivalValue = arrivalInput.value;
    const departureDate = document.getElementById("departure-date").value;
    const arrivalDate = document.getElementById("arrival-date").value;
    const isOneWay = oneWayCheckbox.checked;
    const formData = new FormData(this);

    if (
      !departureValue ||
      !arrivalValue ||
      !departureDate ||
      (!isOneWay && !arrivalDate)
    ) {
      resultDiv.innerHTML = "<p>Lütfen tüm alanları doldurun.</p>";
      return;
    } else {
      loadingDiv.classList.remove("hidden");
      resultDiv.innerHTML = "";

      axios
        .post("/flights", formData)
        .then((response) => {
          console.log("Server Response:", response.data);
          fetchAndDisplayData();
          loadingDiv.classList.add("hidden");
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          alert("Form submission failed");
          loadingDiv.classList.add("hidden");
        });
    }
  });

function fetchAndDisplayData() {
  axios
    .get("https://64e8b72699cf45b15fe00a70.mockapi.io/api/flights")
    .then((response) => {
      const selectedDepartureAirport =
        document.getElementById("departure").value;
      const selectedArrivalAirport = document.getElementById("arrival").value;

      const filteredDataDepartureToArrival = response.data.filter(
        (item) =>
          item.departureCity === selectedDepartureAirport &&
          item.arrivalCity === selectedArrivalAirport
      );

      const filteredDataArrivalToDeparture = response.data.filter(
        (item) =>
          item.departureCity === selectedArrivalAirport &&
          item.arrivalCity === selectedDepartureAirport
      );

      const filteredData = filteredDataDepartureToArrival.concat(
        filteredDataArrivalToDeparture
      );

      displayFilteredAndSortedData(filteredData);
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

const sortSelect = document.getElementById("sort-select");

function handleSortChange() {
  fetchAndDisplayData();
}

sortSelect.addEventListener("change", handleSortChange);

function displayOneWayFlight(item) {
  const flightDiv = document.createElement("div");
  flightDiv.className = "flightDetails";
  flightDiv.innerHTML = `
    <div class="display-flight">
      <div><strong>${item.airline} (${item.departureCityCode} to ${item.arrivalCityCode})</strong></div>
      <div class="black-text">Departure Time: ${item.departureTime} - Arrival Time: ${item.arrivalTime} (Duration: ${item.duration} hours)</div>
      <button class="priceBtn">${item.price}$</button>
    </div>
  `;
  return flightDiv;
}

function displayReturnFlight(item) {
  const flightDivReturn = document.createElement("div");
  flightDivReturn.className = "flightDetails-return";
  flightDivReturn.innerHTML = `
    <div class="display-flight-return">
      <div><strong>${item.airline} (${item.arrivalCityCode} to ${item.departureCityCode})</strong></div>            
      <div class="black-text">Departure Time: ${item.returnDepartureTime} - Arrival Time: ${item.returnArrivalTime} (Duration: ${item.duration} hours)</div>
      <button class="priceBtn">${item.returnPrice}$</button>
    </div>
  `;
  return flightDivReturn;
}

function displayData(data) {
  const oneWayCheckbox = document.getElementById("one-way");
  const resultDiv = document.querySelector("#result");

  sortSelect.style.display = "block";
  resultDiv.innerHTML = "";
  resultDiv.appendChild(sortSelect);

  data.forEach((item) => {
    if (oneWayCheckbox.checked) {
      const flightDiv = displayOneWayFlight(item);
      resultDiv.appendChild(flightDiv);
    } else {
      const flightDiv = displayOneWayFlight(item);
      const returnFlightDiv = displayReturnFlight(item);
      resultDiv.appendChild(flightDiv);
      resultDiv.appendChild(returnFlightDiv);
    }
  });
}



function displayFilteredAndSortedData(data) {
  const sortValue = sortSelect.value;
  const resultDiv = document.querySelector("#result");

  let sortedData = data.slice();

  if (sortValue === "asc") {
    sortedData.sort((a, b) => a.price - b.price);
  } else if (sortValue === "desc") {
    sortedData.sort((a, b) => b.price - a.price);
  } else if (sortValue === "asc") {
    sortedData.sort((a, b) => a.returnPrice - b.returnPrice);
  } else if (sortValue === "desc") {
    sortedData.sort((a, b) => b.returnPrice - a.returnPrice);
  } else if (sortValue === "departure") {
    sortedData.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
  }

  if (sortValue === "return") {
    sortedData.sort((a, b) =>
      a.returnDepartureTime.localeCompare(b.returnDepartureTime)
    );
  }

  resultDiv.innerHTML = "";
  if (sortedData.length === 0) {
    resultDiv.innerHTML = "<p>Sonuç bulunamadı.</p>";
  } else {
    displayData(sortedData);
  }
}

function showAirportList(inputId, inputValue) {
  axios
    .get("https://64e8b72699cf45b15fe00a70.mockapi.io/api/flights")
    .then((response) => {
      const airportList = document.getElementById(`${inputId}-list`);
      airportList.innerHTML = "";

      const uniqueCities = new Set();

      response.data.forEach((flight) => {
        if (
          flight.departureCity.toLowerCase().includes(inputValue.toLowerCase())
        ) {
          uniqueCities.add(flight.departureCity);
        }
        if (
          flight.arrivalCity.toLowerCase().includes(inputValue.toLowerCase())
        ) {
          uniqueCities.add(flight.arrivalCity);
        }
      });

      uniqueCities.forEach((city) => {
        const listItem = document.createElement("li");
        listItem.textContent = city;
        listItem.addEventListener("click", () => selectAirport(inputId, city));
        airportList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

function selectAirport(inputId, airport) {
  const inputField = document.getElementById(inputId);
  inputField.value = airport;

  const airportList = document.getElementById(`${inputId}-list`);
  airportList.innerHTML = "";
}



function handleOneWayChange() {
  const oneWayCheckbox = document.getElementById("one-way");
  const arrivalDateInput = document.getElementById("arrival-date");
  const arrivalDateLabel = document.getElementById("arrival-date-label");

  if (oneWayCheckbox.checked) {
    arrivalDateInput.disabled = true;
    arrivalDateLabel.style.color = "gray";
    earlyReturnOption.disabled = true
  } else {
    arrivalDateInput.disabled = false;
    arrivalDateLabel.style.color = "black";
  }
}

document.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (
    !clickedElement.classList.contains("autocomplete-list") &&
    !clickedElement.classList.contains("autocomplete-input")
  ) {
    closeAllLists();
  }
});

function closeAllLists() {
  const lists = document.querySelectorAll(".autocomplete-list");
  lists.forEach((list) => {
    list.innerHTML = "";
  });
}
