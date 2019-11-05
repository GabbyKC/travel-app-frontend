import React, {Component} from 'react'
import AppLogo from "../AppLogo/AppLogo";
import Footer from '../Footer/Footer'
import LoginCard from "../LoginCard/LoginCard";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

export default class Login extends Component {
    render() {
        return (
            <div className='login-wrapper'>
                <AppLogo/>
                <div className='back-arrow'>
                    <Link to={{pathname: '/cities'}}>
                        <FontAwesomeIcon icon={faChevronLeft}/>
                    </Link>
                </div>
                <LoginCard/>
                <Footer/>
            </div>
        )
    }
}
