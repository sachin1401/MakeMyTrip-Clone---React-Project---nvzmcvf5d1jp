import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/login.css";
import { signInWithPopup } from "@firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import SignupModal from "../LogInOutPage/Signup";
import { useUserAuth } from "../context/UserAuthContext";

const Login = ({ isModalOpen, openModal, closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);

  // const handleLoginClick = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       console.log("RESULT", result);
  //       const userName = result.user.displayName;
  //       navigate("/", {
  //         state: {
  //           userName,
  //         },
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("ERROR", error);
  //     });
  //   // console.log("Login btn clicked");
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      console.log("logging in home");
      navigate("/");
      closeModal();
    } catch (e) {
      setError(e.message);
    }
  };

  //modal for signup
  const openSignUpModal = () => {
    setSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
        className="custom-modal"
        ariaHideApp={false}
        overlayClassName="custom-modal-overlay"
      >
        {/* <Login/> */}
        {/* Add your login form here */}
        <div className="login-modal-image">
          <img
            src="https://imgak.mmtcdn.com/pwa_v3/pwa_header_assets/loginPersuassionRoad.webp"
            alt="road image"
          />
        </div>

        <div className="input-wrapper">
          <div className="input-modal">
            <div className="login-heading-box">
              <p className="log-sign-heading">Login/Sign Up</p>
              <button onClick={closeModal} className="closeBtn">
                ❌
              </button>
            </div>
            {error && <h3>{error}</h3>}
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Email"
                className="signin-input-email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="Password"
                className="signin-input-password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="continue-btn">CONTINUE</button>
              <p className="commonTextGrey">or login with</p>
              <div className="google-box">
                {/* <img className="gLogo" src={googleLogo} alt="google logo" /> */}
                <h4 className="gName">Google</h4>
              </div>
              <div className="signUpBox">
                <h4 className="signUpLink">
                  {" "}
                  Don't have an account?
                  <p
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={openSignUpModal}
                  >
                    Sign up
                  </p>
                </h4>
              </div>
              <p className="description">
                By proceeding, you agree to MakeMyTrip's Privacy Policy, User
                Agreement and T&Cs
              </p>
            </form>
          </div>
        </div>
      </Modal>
      <SignupModal
        isSignUpModalOpen={isSignUpModalOpen}
        closeSignUpModal={closeSignUpModal}
      />
      {/* Render the LoginModal component */}
    </>
  );
};

export default Login;
