import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import './UserLogo.css';


export default class UserLogo extends Component {
    render() {
        return (
            <div className='user-container'>
                <NavLink to="/login">
                    <FontAwesomeIcon
                        className="user-icon"
                        icon={faUser}
                    />
                </NavLink>
            </div>
        )
    }
}
