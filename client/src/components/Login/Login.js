import React, {Component} from 'react'
import AppLogo from "../AppLogo/AppLogo";
import Footer from '../Footer/Footer'
import LoginCard from "../LoginCard/LoginCard";

export default class Login extends Component {
    render() {
        return (
            <div className='login-wrapper'>
                <AppLogo/>
                <LoginCard/>
                <Footer/>
            </div>
        )
    }
}
