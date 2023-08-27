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
      // console.log("API Response:", response.data);
      const selectedDate = document.getElementById("departure-date").value;
      const selectedDepartureAirport =
        document.getElementById("departure").value;
      const selectedArrivalAirport = document.getElementById("arrival").value;
     
      
     

      const filteredData = response.data.filter(
        (item) =>
          item.departureDate === selectedDate &&
          item.departureCity === selectedDepartureAirport &&
          item.arrivalCity === selectedArrivalAirport
      );
      displayData(filteredData);
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

function displayData(data) {
  const oneWayCheckbox = document.getElementById("one-way");
  const resultDiv = document.querySelector("#result"); // Use '#result' to select by ID

  data.forEach((item) => {
    const flightDiv = document.createElement("div");
    flightDiv.className = "flightDetails"; // Add a class name for styling if needed
    flightDiv.innerHTML = `
    <div>
      <div>${item.airline} (${item.departureCityCode} to ${item.arrivalCityCode}) - ${item.departureDate}
      <br> Departure Time: ${item.departureTime} - Arrival Time: ${item.arrivalTime} (${item.duration})
      <br> Price: ${item.price}
    </div>`;

    if (!oneWayCheckbox.checked) {
      flightDiv.innerHTML += `
      <div>
      ${item.airline} (${item.arrivalCityCode} to ${item.departureCityCode}) - ${item.returnDate}            
      <br> Departure Time: ${item.returnTime} - Arrival Time: ${item.returnArrivalTime} (${item.duration})
      <br> Price: ${item.returnPrice}</div>`;
    }

    flightDiv.innerHTML += `</div>`;
    resultDiv.appendChild(flightDiv); // Append the flightDiv to the resultDiv
  });
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
  const arrivalDateLabel = document.getElementById("arrival-date");

  if (oneWayCheckbox.checked) {
    arrivalDateInput.disabled = true;
    arrivalDateLabel.style.color = "gray";
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
