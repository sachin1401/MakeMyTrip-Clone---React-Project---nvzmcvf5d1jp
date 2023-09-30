import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext.jsx";

const Signup = ({ isSignUpModalOpen, closeSignUpModal, openLoginModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    if (!name) {
      setError("Please provide your name.");
      return;
    }
    e.preventDefault();
    setError("");
    try {
      await signUp(email, Password, name);
      closeSignUpModal(); // Close the SignupModal after successful signup
      openLoginModal(); // Open the LoginModal
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal
        isOpen={isSignUpModalOpen}
        onRequestClose={closeSignUpModal}
        contentLabel="Signup Modal"
        className="signup-custom-modal"
        ariaHideApp={false}
        overlayClassName="signupcustom-modal-overlay"
      >
        <div className="signup-input-wrapper">
          <div className="signup-input-modal">
            {error && <h3>{error}</h3>}
            <form onSubmit={handleSubmit}>
              <div className="login-heading-box">
                <p className="sign-up-heading">Sign Up </p>
                <button onClick={closeSignUpModal} className="closeBtn">
                  ❌
                </button>
              </div>
              <input
                placeholder="Full Name"
                className="signup-fullname"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                placeholder="Email address"
                className="signup-email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="Password"
                className="signup-password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="signup-btn">Sign up</button>
              <div className="log-in-box">
                <h4 className="log-in-link">
                  Already have an account?{" "}
                  <p
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={closeSignUpModal}
                  >
                    Log In
                  </p>
                </h4>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Signup;
