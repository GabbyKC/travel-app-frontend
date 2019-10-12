import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "./Landing.css";
import Header from "../components/Header/Header";

const Landing = () => {
  return (
    <div className='landing-bg'>
      <Header />
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
    </div>
  );
};

export default Landing;
