import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Home } from "./HomePage/Home";
import { Flights } from "./HomePage/Flights";
import { Hotels } from "./HomePage/Hotels";
import { Trains } from "./HomePage/Trains";
import { Navbar } from "./HomePage/Navbar";
import { NoMatch } from "./components/NoMatch";
// import Login from "./LogInOutPage/Login";
// import Signup from "./LogInOutPage/Signup";
import Cart from "./components/Cart";
import Payment from "./PaymentPage/Payment";
import PaymentStatus from "./PaymentPage/PaymentStatus";
import { CartProvider } from "react-use-cart";
import Filter from "./components/Filter";
import HotelFilter from "./components/hotelFilter";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { auth } from "./firebase";
import { useState, useEffect } from "react";

function App() {
  const navigate = useNavigate();

  const handleBuyNow = (totalPrice) => {
    navigate(`/payment?total=${totalPrice}`);
  };

  const [username, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName("");
      }
    });
  }, []);

  const [value, setValue] = useState("");

  const getData = (data) => {
    setValue(data);
  };

  return (
    <UserAuthContextProvider>
      <CartProvider>
        {/* <Navbar /> */}
        <Navbar onSubmit={getData} userName={username} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="flight" element={<Flights />} />
          <Route path="cart" element={<Cart onBuyNow={handleBuyNow} />} />
          <Route path="hotel" element={<Hotels />} />
          <Route path="train" element={<Trains />} />
          <Route path="filter" element={<Filter />} />
          <Route path="hotel-filter" element={<HotelFilter />} />
          {/* <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} /> */}
          <Route path="payment" element={<Payment />} />
          <Route path="payment-status" element={<PaymentStatus />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </CartProvider>
    </UserAuthContextProvider>
  );
}

export default App;
