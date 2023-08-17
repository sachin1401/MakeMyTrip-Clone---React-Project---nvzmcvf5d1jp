import React from "react";
import { useState } from "react";
import { useCart } from "react-use-cart";
import "../styles/Cart.css";
import { NavLink } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import Login from "../LogInOutPage/Login";

const Cart = () => {
  const { user } = useUserAuth();
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false); // Add state for login modal

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };
  if (isEmpty) return <h1 className="empty-cart">Your Cart is Empty</h1>;

  return (
    <div className="cart-wrapper">
      <div className="inner-cart-wrapper">
        <h5 className="item-details">
          Cart ({totalUniqueItems}) Total Items: ({totalItems})
        </h5>
        <div className="shopping-container">
          {items.map((item, index) => {
            const subtotal = item.price * item.quantity;
            return (
              <div className="shopping-item" key={index}>
                <h5 className="product-title">From: {item.from}</h5>
                {/* <h5 className="product-title">To</h5> */}
                <h5 className="product-title">To: {item.to}</h5>
                <h5 className="product-title">City: {item.city}</h5>
                <h5 className="product-title">Guest: {item.guests}</h5>
                <h5 className="product-price">₹{subtotal}</h5>
                <h5 className="product-quantity">( {item.quantity} )</h5>
                <div className="increase-decrease-remove-btns">
                  <button
                    className="increase-btn btn"
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    className="decrease-btn btn"
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <button
                    className="remove-btn btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="cart-handles">
          <h2 className="total-price">Total Price: ₹{cartTotal.toFixed(2)}</h2>
          <div className="btns-cart">
            <button className="clear-cart-btn" onClick={() => emptyCart()}>
              Clear Cart
            </button>
            {user ? ( // Check if user is logged in
              <NavLink to={`/payment?total=${cartTotal.toFixed(2)}`}>
                <button className="buy-now-btn">Buy Now</button>
              </NavLink>
            ) : (
              <button className="buy-now-btn" onClick={openLoginModal}>
                Buy Now
              </button>
            )}

            {/* <NavLink to={`/payment?total=${cartTotal.toFixed(2)}`}>
              <button className="buy-now-btn">Buy Now</button>
            </NavLink> */}
          </div>
          <Login
            isModalOpen={isLoginModalOpen}
            openModal={openLoginModal}
            closeModal={closeLoginModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
