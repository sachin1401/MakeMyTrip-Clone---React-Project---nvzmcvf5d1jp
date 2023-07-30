import React from "react";
import { useState } from "react";
import "../styles/filter.css";
import { useEffect } from "react";

const Filter = ({ handleFilter }) => {
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const airlineNames = ["Vistara", "Indigo", "Air Asia", "Air India"];

  const toggleCheckbox = (airline) => {
    setSelectedAirlines((prevSelectedAirlines) =>
      prevSelectedAirlines.includes(airline)
        ? prevSelectedAirlines.filter((a) => a !== airline)
        : [...prevSelectedAirlines, airline]
    );
  };

  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRange(priceRange);
  };

  useEffect(() => {
    // Call the handleFilter function whenever the filter values change
    handleFilter(selectedAirlines, selectedPriceRange);
  }, [selectedAirlines, selectedPriceRange]);

  return (
    <section id="sidebar">
      <div className="border-bottom pb-2 ml-2">
        <h4 id="burgundy">Filters</h4>
      </div>
      <div className="py-2 border-bottom ml-3">
        <h6 className="font-weight-bold">Airlines</h6>
        <div id="orange" className="fa-icon">
          <span className="fa fa-minus" />
        </div>
        <form>
          {airlineNames.map((airline) => (
            <div className="form-group" key={airline}>
              <input
                type="checkbox"
                id={`airline${airline}`}
                checked={selectedAirlines.includes(airline)}
                onChange={() => toggleCheckbox(airline)}
              />
              <label htmlFor={`airline${airline}`}>{airline}</label>
            </div>
          ))}
        </form>
      </div>
      <div className="py-2 border-bottom ml-3">
        <h6 className="font-weight-bold">Price</h6>
        <form>
          <div className="form-group">
            <input
              type="checkbox"
              id="priceUnder2000"
              name="priceRange"
              checked={selectedPriceRange === "2000"}
              onChange={() => handlePriceRangeChange("2000")}
            />
            <label htmlFor="priceUnder2000">Under 2000</label>
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              id="priceUnder4000"
              name="priceRange"
              checked={selectedPriceRange === "4000"}
              onChange={() => handlePriceRangeChange("4000")}
            />
            <label htmlFor="priceUnder4000">Under 4000</label>
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              id="priceUnder6000"
              name="priceRange"
              checked={selectedPriceRange === "6000"}
              onChange={() => handlePriceRangeChange("6000")}
            />
            <label htmlFor="priceUnder6000">Under 6000</label>
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              id="priceUnder8000"
              name="priceRange"
              checked={selectedPriceRange === "8000"}
              onChange={() => handlePriceRangeChange("8000")}
            />
            <label htmlFor="priceUnder8000">Under 8000</label>
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              id="priceUnder10000"
              name="priceRange"
              checked={selectedPriceRange === "10000"}
              onChange={() => handlePriceRangeChange("10000")}
            />
            <label htmlFor="priceUnder10000">Under 10000</label>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Filter;
