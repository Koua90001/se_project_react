import { useContext } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";



function Header({
  handleAddClick,
  weatherData,
  handleRegisterClick,
  handleLoginClick,
  isLoggedIn,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="header logo" />
      </Link>
      <p className="header__date.and.location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn && (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add.clothes-btn"
        >
          + Add clothes
        </button>
      )}
      {!isLoggedIn && (
        <div className="header__registration">
          <button onClick={handleRegisterClick} className="header__signup">
            Sign Up
          </button>
          <button onClick={handleLoginClick} className="header__signin">
            Log in
          </button>
        </div>
      )}
      {isLoggedIn && (
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">{currentUser.name}</p>
            <img
              src={avatar}
              alt={currentUser?.name}
              className="header__avatar"
            />
          </div>
        </Link>
      )}
    </header>
  );
}

export default Header;