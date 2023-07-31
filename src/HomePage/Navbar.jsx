import { NavLink } from "react-router-dom";
import logo from "../assets/mmtLogo.png";
import houseLogo from "../assets/house.png";
import flightLogo from "../assets/travel.png";
import hotelLogo from "../assets/hotel.png";
import trainLogo from "../assets/train.png";
import userLogo from "../assets/user.png";
import logoutLogo from "../assets/logout.png";
import cartLogo from "../assets/Cart.png";
import "../styles/homePage.css";
import "../styles/customerReview.css";
import Login from "../LogInOutPage/Login";
import { useUserAuth } from "../context/UserAuthContext";
import { useState, useEffect } from "react";

// import cart2Logo from "../assets/cart2.png";

const navLinkStyle = ({ isActive }) => {
  return {
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: isActive ? "none" : "none",
  };
};

export const Navbar = (props) => {
  const { user, logOut } = useUserAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const openLoginModal = () => {
    setModalOpen(true);
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await logOut(); // Call the logOut function from the context
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="nav-navbar">
      <img src={logo} className="website-logo" alt="Logo" />

      <NavLink style={navLinkStyle} to="/">
        <img src={houseLogo} className="Logo" alt="Logo" />
        <br />
        <span className="nav-head-style">Home</span>
      </NavLink>

      <NavLink style={navLinkStyle} to="flight">
        <img src={flightLogo} className="Logo" alt="Logo" />
        <br />
        <span className="nav-head-style">Flights</span>
      </NavLink>

      <NavLink style={navLinkStyle} to="hotel">
        <img src={hotelLogo} className="Logo" alt="Logo" />
        <br />
        <span className="nav-head-style">Hotels</span>
      </NavLink>
      <NavLink style={navLinkStyle} to="train">
        <img src={trainLogo} className="Logo" alt="Logo" />
        <br />
        <span className="nav-head-style">Trains</span>
      </NavLink>
      <NavLink style={navLinkStyle} className="userCart" to="cart">
        <img src={cartLogo} className="cartLogo" alt="Logo" />
        <br />
        <span className="nav-head-style ">Cart</span>
      </NavLink>
      {/* <NavLink style={navLinkStyle} className="userProfile" to="login">
        <img src={userLogo} className="UserLogo" alt="Logo" />
        <br />
        <span className="nav-head-style">Log In</span>
      </NavLink> */}
      <div className="signin_container">
        {/* Check if user is logged in */}
        {user ? (
          <>
            <div className="userContainer">
              <h5>{user && `Welcome ${user.displayName}`}</h5>
            </div>
            <img
              className="userLogo navIcon"
              src={userLogo}
              alt="user-icon"
              onClick={handleLogout}
            />
            <button className="logInBtn" onClick={handleLogout}>
              LOGOUT
            </button>
          </>
        ) : (
          <>
            <div className="userContainer">
              <img
                className="userLogo navIcon"
                src={userLogo}
                alt="user-icon"
                onClick={openModal}
              />
              <button className="logInBtn" onClick={openModal}>
                LOGIN
              </button>
            </div>
          </>
        )}
      </div>

      {/* Render the LoginModal component */}
      <Login
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
        openLoginModal={openLoginModal}
      />

      {/* <NavLink style={navLinkStyle}  to="logout">
        <img src={logoutLogo} className="UserLogo" alt="Logo" /><br/><span className="nav-head-style">Log In</span>
      </NavLink> */}
    </nav>
  );
};
