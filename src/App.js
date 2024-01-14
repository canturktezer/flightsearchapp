import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import Flightspage from "./pages/flightpage/Flightspage";
import Homepage from "./pages/homepage/Homepage";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Routes>
         <Route path="/" element={<Homepage />} />
         <Route path="/flights" element={<Flightspage />} />
       </Routes>
    </div>
  );
}

export default App;
