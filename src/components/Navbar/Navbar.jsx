// import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import arrow_icon from "../../assets/arrow_icon.png";
import { useContext } from "react";
import { CoinContext } from "../../context/CoinContext";

const Navbar = () => {
  const { setcurr } = useContext(CoinContext);

  const curr_handler = (event) => {
    switch (event.target.value) {
      case "usd": {
        setcurr({ name: "usd", symbol: "$" });
        break;
      }
      case "euro": {
        setcurr({ name: "eur", symbol: "€" });
        break;
      }
      case "inr": {
        setcurr({ name: "inr", symbol: "₹" });
        break;
      }
      default: {
        setcurr({ name: "usd", symbol: "$" });
        break;
      }
    }
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={logo} className="logo" alt="" />
      </Link>
{/*       <ul>
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={""}>
          <li>Features</li>
        </Link>
        <Link>
          <li>Pricing</li>
        </Link>
        <Link>
          <li>Blog</li>
        </Link>
      </ul> */}
      <div className="nav-right">
        <select onChange={curr_handler}>
          <option value="usd">USD</option>
          <option value="euro">EUR</option>
          <option value="inr">INR</option>
        </select>
{/*         <button>
          Sign Up <img src={arrow_icon} alt="" />
        </button> */}
      </div>
    </div>
  );
};

export default Navbar;
