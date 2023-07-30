import React from "react";
import { useCart } from "react-use-cart";
import "../styles/Cart.css";
import { NavLink } from "react-router-dom";

const Cart = () => {
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

  if (isEmpty) return <h1 className="empty-cart">Your Cart is Empty</h1>;

  return (
    <div className="cart-wrapper">
      <div className="inner-cart-wrapper">
        <h5 className="item-details">
          Cart ({totalUniqueItems}) Total Items: ({totalItems})
        </h5>
        <div className="shopping-container">
          {items.map((item, index) => {
            return (
              <div className="shopping-item" key={index}>
                <h5 className="product-title">From: {item.from}</h5>
                {/* <h5 className="product-title">To</h5> */}
                <h5 className="product-title">To: {item.to}</h5>
                <h5 className="product-title">City: {item.city}</h5>
                <h5 className="product-title">Guest: {item.guests}</h5>
                <h5 className="product-price">₹{item.price}</h5>
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
            <NavLink to={`/payment?total=${cartTotal.toFixed(2)}`}>
              <button className="buy-now-btn">Buy Now</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
