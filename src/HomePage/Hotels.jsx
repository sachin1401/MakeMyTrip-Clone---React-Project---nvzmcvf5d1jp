import React, { useEffect, useState } from "react";
import Cart from "../components/Cart";
import "../styles/tickets.css";
import "../styles/searchContainer.css";
import { useCart } from "react-use-cart";
import { CartProvider } from "react-use-cart";
import hotelData from "../Data/hotelData";
import HotelFilter from "../components/hotelFilter";
import Footer from "../HomePage/Footer";

export const Hotels = () => {
  const { addItem } = useCart();
  const [filteredHotels, setFilteredHotels] = useState(hotelData);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [hotels, setHotels] = useState([]);
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [departureFilter, setDepartureFilter] = useState("");
  const [returnFilter, setReturnFilter] = useState("");
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem("hotels"));
    if (storedHotels) {
      setHotels(storedHotels);
      setFilteredHotels(storedHotels);
    } else {
      // If data not found in localStorage, set the static hotelData
      setHotels(hotelData);
      setFilteredHotels(hotelData);
      localStorage.setItem("hotels", JSON.stringify(hotelData));
    }
  }, []);

  const applyFilters = () => {
    const filteredData = hotels.filter((hotel) => {
      const fromMatch = hotel.city
        .toLowerCase()
        .includes(fromFilter.toLowerCase());
      const toMatch = hotel.check_in
        .toLowerCase()
        .includes(toFilter.toLowerCase());
      const departureMatch = hotel.check_out.includes(departureFilter);
      const returnMatch = hotel.guests.includes(returnFilter);

      return fromMatch && toMatch && departureMatch && returnMatch;
    });

    setFilteredHotels(filteredData);
    setShowCart(false);
  };
  // sidebar filtered
  const applySiderBarFilters = (priceRange) => {
    const filteredData = hotelData.filter((hotel) => {
      const priceMatch =
        priceRange === "" || parseInt(hotel.price) <= parseInt(priceRange);

      return priceMatch;
    });

    setFilteredHotels(filteredData);
  };

  return (
    <div>
      <div className="search-container-wrapper">
        <div className="search-container">
          <div className="search-labelBox-border">
            <div className="search-labelBox">
              <label htmlFor="from">City:</label>
              <input
                type="text"
                id="from"
                className="search-labelBox-size"
                value={fromFilter}
                onChange={(e) => setFromFilter(e.target.value)}
              />
            </div>
            <div className="search-labelBox">
              <label htmlFor="to">Check-In:</label>
              <input
                type="text"
                id="to"
                className="search-labelBox-size"
                value={toFilter}
                onChange={(e) => setToFilter(e.target.value)}
              />
            </div>
            <div className="search-labelBox">
              <label htmlFor="departure">Check-Out:</label>
              <input
                type="text"
                id="departure"
                className="search-labelBox-size"
                value={departureFilter}
                onChange={(e) => setDepartureFilter(e.target.value)}
              />
            </div>
            <div className="search-labelBox">
              <label htmlFor="return">Guests:</label>
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
          <HotelFilter
            handleFilter={(hotels, priceRange) =>
              applySiderBarFilters(hotels, priceRange)
            }
          />

          <div className="hotels-container">
            {filteredHotels.map((hotel, index) => (
              <div
                key={hotel.id || index}
                className="bp-card"
                data-clickthrough="link"
              >
                <div className="bp-card_label">
                  <div className="bd-border_solid"></div>
                  <div className="bd-border_dotted"></div>
                </div>
                <div className="bp-card_content">
                  <p className="secondary">Hotel booking</p>
                  <h4>{hotel.hotel_name}</h4>
                  <table className="ticket-data">
                    <tbody>
                      <tr>
                        <th>{hotel.check_in}</th>
                        <th>{hotel.city}</th>
                        <th>{hotel.check_out}</th>
                      </tr>
                      <tr>
                        <td>{hotel.room_type}</td>
                        <td></td>
                        <td>{hotel.guests}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button className="ticket-btn" onClick={() => addItem(hotel)}>
                    Book
                  </button>
                  <a href="" className="price">
                    ₹ {hotel.price}
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
