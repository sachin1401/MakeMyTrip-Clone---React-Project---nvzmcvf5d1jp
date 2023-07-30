import React, { useState } from "react";
import { useEffect } from "react";
import Cart from "../components/Cart";
import { useCart } from "react-use-cart";
import "../styles/tableStyles.css";
import "../styles/searchContainer.css";
import trainData from "../Data/trainData";
import { CartProvider } from "react-use-cart";
import TrainFilter from "../components/TrainFilter";
import Footer from "../HomePage/Footer";

export const Trains = () => {
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

  return (
    <div>
      <div className="search-container-wrapper">
        <div className="search-container">
          <div className="search-labelBox-border">
            <div className="search-labelBox">
              <label htmlFor="from">From:</label>
              <input
                type="text"
                id="from"
                className="search-labelBox-size"
                value={fromFilter}
                onChange={(e) => setFromFilter(e.target.value)}
              />
            </div>
            <div className="search-labelBox">
              <label htmlFor="to">To:</label>
              <input
                type="text"
                id="to"
                className="search-labelBox-size"
                value={toFilter}
                onChange={(e) => setToFilter(e.target.value)}
              />
            </div>
            <div className="search-labelBox">
              <label htmlFor="departure">Travel-Date:</label>
              <input
                type="text"
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
            {filteredTrains.map((train, index) => (
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
                  <button className="ticket-btn" onClick={() => addItem(train)}>
                    Book
                  </button>
                  <a href="" className="price">
                    ₹ {train.price}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </CartProvider>
      {showCart && <Cart />}
    </div>
  );
};
