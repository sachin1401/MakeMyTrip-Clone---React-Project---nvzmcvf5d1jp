import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/payment.css";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const totalPrice = queryParams.get("total");

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  // const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate a 2-second delay for the payment process
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 2000);
  };

  // Use the useEffect hook to reset the payment success message and redirect
  useEffect(() => {
    if (paymentSuccess) {
      // After 2 seconds, reset paymentSuccess to false and redirect to "payment-status"
      const timer = setTimeout(() => {
        setPaymentSuccess(false);
        navigate("/payment-status"); // Redirect to the "payment-status" page
      }, 2000);

      // Clean up the timer to avoid memory leaks
      return () => clearTimeout(timer);
    }
  }, [paymentSuccess, navigate]);

  // const navigate = useNavigate();
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   navigate("/payment-status");
  // };

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="flex-row">
            <label htmlFor="card-number">Card Number</label>
            <input
              name="card-number"
              className="card-number"
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234-4567-8910-1112"
              required
            />
          </div>
          <div className="flex-row">
            <label htmlFor="card-name">Holder Name</label>
            <input
              name="card-name"
              className="card-name"
              type="text"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              placeholder="Sachin Patel"
              required
            />
          </div>
          <div className="flex-row">
            <table>
              <tbody>
                <tr>
                  <td className="table-column">
                    <label htmlFor="month">Expiration Date</label>
                    <select
                      name="month"
                      id="month-select"
                      value={expiryMonth}
                      maxlength="16"
                      onChange={(e) => setExpiryMonth(e.target.value)}
                    >
                      <option value="" disabled>
                        Month
                      </option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                      {/* Add the rest of the options for months */}
                    </select>
                    <select
                      name="year"
                      id="year-select"
                      value={expiryYear}
                      onChange={(e) => setExpiryYear(e.target.value)}
                    >
                      <option value="" disabled>
                        Year
                      </option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                      {/* Add the rest of the options for years */}
                    </select>
                  </td>
                  <td className="table-column">
                    <label htmlFor="card-cvv">CVV</label>
                    <input
                      name="card-cvv"
                      className="card-cvv"
                      type="text"
                      value={cvv}
                      maxlength="3"
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex-row">
            <h2 className="total-price">Total Price: ₹{totalPrice}</h2>
          </div>
          <div className="flex-row">
            {/* <NavLink to="/payment-status"> */}
            <input className="card-submit" type="submit" value="Pay Now" />
            {/* </NavLink> */}
          </div>
        </form>
        {paymentSuccess && (
          <div className="payment-success-message">Payment Processing...</div>
        )}
        <img
          className="card-image"
          src="https://pngimg.com/uploads/credit_card/credit_card_PNG99.png"
          alt="Card image"
        />
        <div className="card-image-shadow"></div>
      </div>
    </div>
  );
};

export default Payment;
