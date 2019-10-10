import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "./Landing.css";
import Footer from "../components/Footer/Footer";

const Landing = () => {
  return (
    <div>
      <div className="flex-container">
        <img
          className="app-logo"
          src={require("../images/app_logo.png")}
          alt=""
        />
      </div>

      <p className="landing-text">Find your perfect trip...</p>
      <div className="flex-container">
        <NavLink to="/cities">
          <FontAwesomeIcon
            className="landing-arrow"
            icon={faArrowCircleRight}
          />
        </NavLink>
      </div>

      <p className="landing-text-small">
        Want to build your own Trip Recommendation?
      </p>

      <div className="flex-container">
        <NavLink className="landing-links" to="/login">
          Log In
        </NavLink>
        <NavLink className="landing-links" to="/create-account">
          Create Account
        </NavLink>
      </div>

      <Footer />

    </div>
  );
};

export default Landing;
