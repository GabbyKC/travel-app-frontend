import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import './Footer.css';


export default class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <NavLink className='footer-link' to="/">
          <FontAwesomeIcon
            icon={faHome}
          />
        </NavLink>
      </div>
    );
  }
}
