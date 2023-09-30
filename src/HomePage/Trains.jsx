import React, { useState } from "react";
import Cart from "../components/Cart";
import { useCart } from "react-use-cart";
import "../styles/tableStyles.css";
import "../styles/searchContainer.css";
import trainData from "../Data/trainData";
import { CartProvider } from "react-use-cart";
import TrainFilter from "../components/TrainFilter";
import Footer from "../HomePage/Footer";
import Login from "../LogInOutPage/Login";
import { useUserAuth } from "../context/UserAuthContext";

export const Trains = () => {
  const { user } = useUserAuth();
  const { addItem } = useCart();
  const [trains, setTrains] = useState(trainData);
  const [filteredTrains, setFilteredTrains] = useState(trainData);
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [departureFilter, setDepartureFilter] = useState("");
  const [returnFilter, setReturnFilter] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [trainTypeFilter, setTrainTypeFilter] = useState([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState("");
  const [isLoginModalOpen, setLoginModalOpen] = useState(false); // Add state for login modal

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const applyFilters = () => {
    const filteredData = trains.filter((train) => {
      const fromMatch = train.from
        .toLowerCase()
        .includes(fromFilter.toLowerCase());
      const toMatch = train.to.toLowerCase().includes(toFilter.toLowerCase());
      const departureMatch =
        train.departure.departureDate.includes(departureFilter);
      const returnMatch = train.train_number.includes(returnFilter);

      return fromMatch && toMatch && departureMatch && returnMatch;
    });

    setFilteredTrains(filteredData);
    setShowCart(false);
  };

  // sidebar filtered
  const applySiderBarFilters = (priceRange) => {
    const filteredData = trainData.filter((train) => {
      const priceMatch =
        priceRange === "" || parseInt(train.price) <= parseInt(priceRange);

      return priceMatch;
    });

    setFilteredTrains(filteredData);
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
                {trainData.map((train) => (
                  <option key={train.id} value={train.from}>
                    {train.from}
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
                {trainData.map((train) => (
                  <option key={train.id} value={train.to}>
                    {train.to}
                  </option>
                ))}
              </select>
            </div>
            <div className="search-labelBox">
              <label htmlFor="departure">Travel-Date:</label>
              <input
                type="date"
                id="departure"
                className="search-labelBox-size"
                value={departureFilter}
                onChange={(e) => setDepartureFilter(e.target.value)}
              />
            </div>
            <div className="search-labelBox">
              <label htmlFor="return">Train-Number:</label>
              <input
                type="text"
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
          <TrainFilter
            handleFilter={(trains, priceRange) =>
              applySiderBarFilters(trains, priceRange)
            }
          />

          <div className="ticket-container">
            {filteredTrains.length === 0 ? (
              <div className="not-available-message">Not Available</div>
            ) : (
              filteredTrains.map((train, index) => (
                <div
                  key={train.id || index}
                  className="bp-card"
                  data-clickthrough="link"
                >
                  <div className="bp-card_label">
                    <div className="bd-border_solid"></div>
                    <div className="bd-border_dotted"></div>
                  </div>
                  <div className="bp-card_content">
                    <p className="secondary">Train ticket</p>
                    <h4>{train.train_number}</h4>
                    <table className="ticket-data">
                      <tbody>
                        <tr>
                          <th>{train.departure.departureDate}</th>
                          <th>{train.duration}</th>
                          <th>{train.departure.departureTime}</th>
                        </tr>
                        <tr>
                          <td>{train.from}</td>
                          <td>{train.kilometers}km</td>
                          <td>{train.to}</td>
                        </tr>
                      </tbody>
                    </table>
                    {user ? (
                      <button
                        className="ticket-btn"
                        onClick={() => addItem(train)}
                      >
                        Book
                      </button>
                    ) : (
                      <button className="ticket-btn" onClick={openLoginModal}>
                        Book
                      </button>
                    )}
                    <a href="" className="price">
                      ₹ {train.price}
                    </a>
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
