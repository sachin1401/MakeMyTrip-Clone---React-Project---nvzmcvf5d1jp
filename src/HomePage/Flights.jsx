import React, { useEffect, useState } from "react";
import Cart from "../components/Cart";
import { flightData } from "../Data/flightData";
import "../styles/tickets.css";
import "../styles/searchContainer.css";
import { useCart } from "react-use-cart";
import { CartProvider } from "react-use-cart";
import Fliter from "../components/Filter";
import Footer from "../HomePage/Footer";
import Login from "../LogInOutPage/Login";
import { useUserAuth } from "../context/UserAuthContext";

export const Flights = () => {
  const { user } = useUserAuth();
  const { addItem } = useCart();
  const [flights, setFlights] = useState(flightData);
  const [filteredFlights, setFilteredFlights] = useState(flightData);
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [departureFilter, setDepartureFilter] = useState("");
  const [returnFilter, setReturnFilter] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false); // Add state for login modal

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const applyFilters = () => {
    const filteredData = flights.filter((flight) => {
      const fromMatch = flight.from
        .toLowerCase()
        .includes(fromFilter.toLowerCase());
      const toMatch = flight.to.toLowerCase().includes(toFilter.toLowerCase());
      const departureMatch =
        flight.departure.departureDate.includes(departureFilter);
      const returnMatch = flight.return.returnDate.includes(returnFilter);

      return fromMatch && toMatch && departureMatch && returnMatch;
    });

    setFilteredFlights(filteredData);
    setShowCart(false); // Hide the cart when applying filters
  };
  // sidebar filtered
  const applySiderBarFilters = (airlines, priceRange) => {
    const filteredData = flights.filter((flight) => {
      const airlineMatch =
        airlines.length === 0 || airlines.includes(flight.airlineName);
      const priceMatch =
        priceRange === "" || parseInt(flight.price) <= parseInt(priceRange);

      return airlineMatch && priceMatch;
    });

    setFilteredFlights(filteredData);
    setShowCart(false); // Hide the cart when applying filters
  };

  const clearFilters = () => {
    setFromFilter("");
    setToFilter("");
    setDepartureFilter("");
    setReturnFilter("");
    setFilteredFlights(flights); // Reset filtered flights to original data
    setShowCart(false);
  };

  return (
    <div>
      <div className="search-container-wrapper">
        <div className="search-container">
          <div className="search-labelBox-border">
            <div className="search-labelBox">
              <label htmlFor="from">From:</label>
              <select
                id="from"
                className="search-labelBox-size"
                value={fromFilter}
                onChange={(e) => setFromFilter(e.target.value)}
              >
                <option value="">Select City</option>
                {flightData.map((flight) => (
                  <option key={flight.id} value={flight.from}>
                    {flight.from}
                  </option>
                ))}
              </select>
            </div>
            <div className="search-labelBox">
              <label htmlFor="to">To:</label>
              <select
                id="to"
                className="search-labelBox-size"
                value={toFilter}
                onChange={(e) => setToFilter(e.target.value)}
              >
                <option value="">Select City</option>
                {flightData.map((flight) => (
                  <option key={flight.id} value={flight.to}>
                    {flight.to}
                  </option>
                ))}
              </select>
            </div>
            <div className="search-labelBox">
              <label htmlFor="departure">Departure:</label>
              <input
                type="date"
                id="departure"
                className="search-labelBox-size"
                value={departureFilter}
                onChange={(e) => setDepartureFilter(e.target.value)}
              />
            </div>
            <div className="search-labelBox">
              <label htmlFor="return">Return:</label>
              <input
                type="date"
                id="return"
                className="search-labelBox-size"
                value={returnFilter}
                onChange={(e) => setReturnFilter(e.target.value)}
              />
            </div>
          </div>
          <div className="search-button-container">
            <button onClick={applyFilters}>Search</button>
            <button onClick={clearFilters}>Clear Filter</button>
          </div>
        </div>
      </div>

      {/* tickets */}
      <CartProvider>
        <div className="mix-container">
          <Fliter
            handleFilter={(airlines, priceRange) =>
              applySiderBarFilters(airlines, priceRange)
            }
          />

          <div className="ticket-container">
            {filteredFlights.length === 0 ? (
              <div className="not-available-message">Not Available</div>
            ) : (
              filteredFlights.map((flight, index) => (
                <div
                  key={flight.id || index}
                  className="bp-card"
                  data-clickthrough="link"
                >
                  <div className="bp-card_label">
                    <div className="bd-border_solid"></div>
                    <div className="bd-border_dotted"></div>
                  </div>
                  <div className="bp-card_content">
                    <p className="secondary">Flight ticket</p>
                    <h4>{flight.airlineName}</h4>
                    <table className="ticket-data">
                      <tbody>
                        <tr>
                          <th>{flight.departure.departureTime}</th>
                          <th>{flight.duration}</th>
                          <th>{flight.return.returnTime}</th>
                        </tr>
                        <tr>
                          <td>{flight.from}</td>
                          <td></td>
                          <td>{flight.to}</td>
                        </tr>
                      </tbody>
                    </table>
                    {user ? (
                      <button
                        className="ticket-btn"
                        onClick={() => addItem(flight)}
                      >
                        Book
                      </button>
                    ) : (
                      <button className="ticket-btn" onClick={openLoginModal}>
                        Book
                      </button>
                    )}
                    <a href="" className="price">
                      ₹ {flight.price}
                    </a>{" "}
                  </div>
                </div>
              ))
            )}
          </div>
          <Login
            isModalOpen={isLoginModalOpen}
            openModal={openLoginModal}
            closeModal={closeLoginModal}
          />
        </div>
        <Footer />
      </CartProvider>
      {showCart && <Cart />}
    </div>
  );
};
