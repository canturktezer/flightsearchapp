import { useContext } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import { Link } from "react-router-dom";
import SkyFinderLogo from "../../assets/skyfinder.png";
import { DarkModeContext } from "../../context/darkModeContext";
import "./navbar.scss";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logo">
            <img src={SkyFinderLogo} alt="" />
            <span>skyfinder</span>
          </div>
        </Link>
        {darkMode ? (
          <BiSun
            onClick={toggle}
            style={{ cursor: "pointer", fontSize: "1.5em" }}
          />
        ) : (
          <BiMoon
            onClick={toggle}
            style={{ cursor: "pointer", fontSize: "1.5em" }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
